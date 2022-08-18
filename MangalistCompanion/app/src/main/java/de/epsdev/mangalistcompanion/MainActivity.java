package de.epsdev.mangalistcompanion;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.media.AudioAttributes;
import android.os.Bundle;
import android.os.StrictMode;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.journeyapps.barcodescanner.CaptureActivity;
import com.journeyapps.barcodescanner.ScanContract;
import com.journeyapps.barcodescanner.ScanOptions;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    String endpoint = "";
    String authToken = "";

    Button scanButton;
    TextView titleView;
    TextView subTitleView;
    ImageView imageView;

    SharedPreferences sharedPreferences;
    SharedPreferences.Editor preferenceEditor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sharedPreferences = getSharedPreferences("login", MODE_PRIVATE);
        preferenceEditor = sharedPreferences.edit();

        scanButton = findViewById(R.id.scanButton);
        scanButton.setOnClickListener(v -> scanCode());
        titleView = findViewById(R.id.titleText);
        subTitleView = findViewById(R.id.subTitleText);
        imageView = findViewById(R.id.imageView);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
            .permitAll()
            .build();
        StrictMode.setThreadPolicy(policy);

        endpoint = sharedPreferences.getString("endpoint", "");
        authToken = sharedPreferences.getString("authToken", "");

        if (!endpoint.isEmpty() && !authToken.isEmpty()) {
            Toast
                .makeText(
                    MainActivity.this,
                    "Loaded credentials for " + endpoint,
                    Toast.LENGTH_LONG
                )
                .show();
        }
    }

    private void scanCode() {
        ScanOptions options = new ScanOptions();
        options.setPrompt("Volume up to activate flash");
        options.setBeepEnabled(false);
        options.setOrientationLocked(true);
        options.setCaptureActivity(CaptureAct.class);
        barLauncher.launch(options);
    }

    ActivityResultLauncher<ScanOptions> barLauncher = registerForActivityResult(
        new ScanContract(),
        result -> {
            if (result.getContents() == null) {
                return;
            }

            if (
                result.getContents().length() > 13 &&
                result.getContents().contains("$")
            ) {
                this.endpoint = result.getContents().split("\\$")[0];
                this.authToken = result.getContents().split("\\$")[1];

                preferenceEditor.putString("endpoint", this.endpoint);
                preferenceEditor.putString("authToken", this.authToken);
                preferenceEditor.commit();

                Toast
                    .makeText(
                        MainActivity.this,
                        "Registered new credentials.",
                        Toast.LENGTH_LONG
                    )
                    .show();
                return;
            }

            try {
                JSONObject bookData = getBookDetails(result.getContents());
                titleView.setText(bookData.getString("title"));
                String subtitle = bookData.getString("subtitle");

                if (!subtitle.equals("null")) {
                    subTitleView.setText(subtitle);
                }

                Glide
                    .with(MainActivity.this)
                    .load(
                        endpoint +
                        "/public/thumbnails/" +
                        bookData.getString("isbn") +
                        ".png"
                    )
                    .into(imageView);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
            Vibrator vibrator = (Vibrator) getSystemService(
                Context.VIBRATOR_SERVICE
            );
            vibrator.vibrate(200);
        }
    );

    JSONObject getBookDetails(String isbn) throws IOException, JSONException {
        URL url = new URL(endpoint + "/v1/books/" + isbn);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty(
            "Authorization",
            "Bearer " + authToken
        );
        String rawResponse = "";
        try {
            InputStream in = new BufferedInputStream(
                urlConnection.getInputStream()
            );
            rawResponse = IOUtils.toString(in, StandardCharsets.UTF_8);
        } finally {
            urlConnection.disconnect();
        }

        return new JSONObject(rawResponse);
    }
}

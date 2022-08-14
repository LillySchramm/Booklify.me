package de.epsdev.mangalistcompanion;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.media.AudioAttributes;
import android.os.Bundle;
import android.os.StrictMode;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;
import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;
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

    Button btn_scan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btn_scan = findViewById(R.id.btn_scan);
        btn_scan.setOnClickListener(v -> scanCode());

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
            .permitAll()
            .build();
        StrictMode.setThreadPolicy(policy);
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

            AlertDialog.Builder builder = new AlertDialog.Builder(
                MainActivity.this
            );
            builder.setTitle("Title");
            try {
                builder.setMessage(
                    getBookDetails(result.getContents()).getString("title")
                );
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
            builder
                .setPositiveButton(
                    "OK",
                    (dialog, which) -> {
                        dialog.dismiss();
                    }
                )
                .show();
            Vibrator vibrator = (Vibrator) getSystemService(
                Context.VIBRATOR_SERVICE
            );
            vibrator.vibrate(200);
        }
    );

    JSONObject getBookDetails(String isbn) throws IOException, JSONException {
        URL url = new URL("http://192.168.2.100:8000/v1/books/" + isbn);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
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

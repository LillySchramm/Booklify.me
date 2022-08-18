package de.epsdev.mangalistcompanion;

import android.annotation.SuppressLint;
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
import com.google.android.material.bottomnavigation.BottomNavigationItemView;
import com.google.android.material.bottomnavigation.BottomNavigationView;
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
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    String endpoint = "";
    String authToken = "";

    String currentIsbn = "";
    BookStatus currentBookStatus = BookStatus.NONE;

    BottomNavigationItemView scanButton;
    BottomNavigationItemView ownedButton;
    BottomNavigationItemView wishlistButton;
    BottomNavigationItemView removeButton;
    TextView titleView;
    TextView subTitleView;
    ImageView imageView;

    SharedPreferences sharedPreferences;
    SharedPreferences.Editor preferenceEditor;

    BottomNavigationView bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sharedPreferences = getSharedPreferences("login", MODE_PRIVATE);
        preferenceEditor = sharedPreferences.edit();

        titleView = findViewById(R.id.titleText);
        subTitleView = findViewById(R.id.subTitleText);
        imageView = findViewById(R.id.imageView);
        bottomNavigation = findViewById(R.id.bottomView);
        scanButton = bottomNavigation.findViewById(R.id.menu_button_scan);
        scanButton.setOnClickListener(v -> scanCode());
        ownedButton = bottomNavigation.findViewById(R.id.menu_button_owned);
        ownedButton.setOnClickListener(v -> updateBookStatus(BookStatus.OWNED));
        wishlistButton =
            bottomNavigation.findViewById(R.id.menu_button_wishlist);
        wishlistButton.setOnClickListener(v ->
            updateBookStatus(BookStatus.WHISHLISTED)
        );
        removeButton =
            bottomNavigation.findViewById(R.id.menu_button_remove_ownership);
        removeButton.setOnClickListener(v -> updateBookStatus(BookStatus.NONE));

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

        scanCode();
    }

    private void scanCode() {
        ScanOptions options = new ScanOptions();
        options.setPrompt("Volume up to activate flash");
        options.setBeepEnabled(false);
        options.setOrientationLocked(true);
        options.setCaptureActivity(CaptureAct.class);
        barLauncher.launch(options);
    }

    private void updateBottomButtons() {
        switch (this.currentBookStatus) {
            case NONE:
                this.bottomNavigation.setSelectedItemId(
                        R.id.menu_button_remove_ownership
                    );
                break;
            case OWNED:
                this.bottomNavigation.setSelectedItemId(R.id.menu_button_owned);
                break;
            case WHISHLISTED:
                this.bottomNavigation.setSelectedItemId(
                        R.id.menu_button_wishlist
                    );
                break;
        }
    }

    ActivityResultLauncher<ScanOptions> barLauncher = registerForActivityResult(
        new ScanContract(),
        result -> {
            if (result.getContents() == null) {
                scanCode();
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
                scanCode();
                return;
            }

            try {
                JSONObject bookData = getBookDetails(result.getContents());
                titleView.setText(bookData.getString("title"));
                String subtitle = bookData.getString("subtitle");
                this.currentIsbn = bookData.getString("isbn");

                JSONArray ownershipStatus = bookData.getJSONArray(
                    "ownershipStatus"
                );
                this.currentBookStatus = BookStatus.NONE;
                if (ownershipStatus.length() != 0) {
                    this.currentBookStatus =
                        BookStatus.valueOf(
                            ownershipStatus.getJSONObject(0).getString("status")
                        );
                }

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

            updateBottomButtons();

            if (this.currentIsbn.isEmpty()) {
                scanCode();
            }
        }
    );

    JSONObject getBookDetails(String isbn) throws IOException, JSONException {
        return request("GET", "/v1/books/" + isbn);
    }

    void updateBookStatus(BookStatus bookStatus) {
        if (this.currentBookStatus == bookStatus) {
            return;
        }

        this.currentBookStatus = bookStatus;
        updateBottomButtons();

        try {
            postBookStatus();
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
    }

    void postBookStatus() throws IOException, JSONException {
        request(
            "POST",
            "/v1/books/" +
            this.currentIsbn +
            "/status/" +
            this.currentBookStatus
        );

        Toast
            .makeText(MainActivity.this, "Updated Status!", Toast.LENGTH_LONG)
            .show();
    }

    JSONObject request(String method, String path)
        throws IOException, JSONException {
        URL url = new URL(endpoint + path);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod(method);
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

        rawResponse = rawResponse.isEmpty() ? "{}" : rawResponse;

        return new JSONObject(rawResponse);
    }
}

import 'package:booklify_api/booklify_api.dart';
import 'package:checkdigit/checkdigit.dart';
import 'package:companion_app/api/author.api.dart';
import 'package:companion_app/api/book.api.dart';
import 'package:companion_app/api/publisher.api.dart';
import 'package:companion_app/pages/home.page.dart';
import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:companion_app/state/scanner.state.dart';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:provider/provider.dart';

class ScanPage extends StatefulWidget {
  const ScanPage({super.key});

  @override
  State<ScanPage> createState() => _ScanPageState();
}

class _ScanPageState extends State<ScanPage> {
  MobileScannerController cameraController = MobileScannerController(
    formats: [BarcodeFormat.ean13, BarcodeFormat.ean8],
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => {context.read<MainState>().setContext(Context.home)},
        icon: Icon(Icons.highlight_remove),
        label: Text("Cancel"),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.black,
        child: IconButton(
          color: Colors.white,
          icon: ValueListenableBuilder(
            valueListenable: cameraController.torchState,
            builder: (context, state, child) {
              switch (state as TorchState) {
                case TorchState.off:
                  return const Icon(Icons.flash_off, color: Colors.grey);
                case TorchState.on:
                  return const Icon(Icons.flash_on, color: Colors.yellow);
              }
            },
          ),
          iconSize: 32.0,
          onPressed: () => cameraController.toggleTorch(),
        ),
      ),
      body: MobileScanner(
        // fit: BoxFit.contain,
        controller: cameraController,
        onDetect: (capture) {
          final List<Barcode> barcodes = capture.barcodes;
          for (final barcode in barcodes) {
            var mainState = context.read<MainState>();
            var scannerState = context.read<ScannerState>();

            var isbn = barcode.rawValue;
            if (isbn == null ||
                (!isbn10.validate(isbn) && !isbn13.validate(isbn))) continue;
            cameraController.stop();

            scannerState.setScannedIsbn(isbn);
            mainState.setContext(Context.home);

            loadBookDetails(isbn);
          }
        },
      ),
    );
  }

  void loadBookDetails(String isbn) async {
    var scannerState = context.read<ScannerState>();

    scannerState.reset();
    scannerState.setLoading(true);

    var known = await isBookKnown(isbn);
    scannerState.setWasKnown(known);

    var book = await getBook(isbn);
    scannerState.setBook(book);

    if (book == null) {
      scannerState.setLoading(false);
      scannerState.setNotFound(true);

      return;
    }

    var ownershipStatus = await getBookOwnershipStatus(isbn);
    scannerState.setOwnershipStatus(
        fromOwnershipStatusDtoStatusEnum(ownershipStatus!.status));
    scannerState.setHidden(ownershipStatus.hidden);

    var publisher = await getPublisher(book.publisherId!);
    scannerState.setPublisher(publisher);

    List<AuthorDto> authors = [];
    for (var authorId in book.authors) {
      var author = await getAuthor(authorId.id);

      if (author != null) {
        authors.add(author);
      }
    }

    scannerState.setAuthors(authors);
    scannerState.setLoading(false);
  }
}

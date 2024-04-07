import 'package:booklify_api/booklify_api.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:companion_app/api/book.api.dart';
import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:companion_app/state/scanner.state.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../globals.dart' as globals;

SetOwnershipStatusDtoStatusEnum fromOwnershipStatusDtoStatusEnum(
    OwnershipStatusDtoStatusEnum e) {
  switch (e) {
    case OwnershipStatusDtoStatusEnum.OWNED:
      return SetOwnershipStatusDtoStatusEnum.OWNED;
    case OwnershipStatusDtoStatusEnum.NONE:
      return SetOwnershipStatusDtoStatusEnum.NONE;
    default:
      throw Exception('Unknown enum value: $e');
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    var scannerState = context.watch<ScannerState>();

    Widget widget = BookDisplay();
    if (scannerState.scannedIsbn == null) {
      widget = const NoScanPlaceholder();
    }

    return Scaffold(
      body: widget,
      floatingActionButton: FloatingActionButton.extended(
          onPressed: onScanPressed,
          label: Text("Scan ISBN"),
          icon: Icon(CupertinoIcons.barcode_viewfinder)),
    );
  }

  void onScanPressed() async {
    var scannerState = context.read<ScannerState>();
    scannerState.setScannedIsbn(null);

    var mainState = context.read<MainState>();
    mainState.setContext(Context.scan);
  }
}

class NoScanPlaceholder extends StatelessWidget {
  const NoScanPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text("Scan a book to begin!"),
    );
  }
}

class BookDisplay extends StatelessWidget {
  const BookDisplay({super.key});

  @override
  Widget build(BuildContext context) {
    var scannerState = context.watch<ScannerState>();

    if (scannerState.loading) {
      return BookLoadingIndicator();
    }

    if (scannerState.notFound || scannerState.book == null) {
      return BookNotFoundDisplay();
    }

    return Scaffold(
        body: Column(
      children: [
        SizedBox.fromSize(
          size: Size.fromHeight(MediaQuery.of(context).size.height * 0.4),
          child: BookCover(scannerState: scannerState),
        ),
        SizedBox(height: 10),
        Text(scannerState.book!.title!,
            style: Theme.of(context).textTheme.headlineMedium,
            textAlign: TextAlign.center),
        SizedBox(height: 10),
        BookStatusButton(),
        SizedBox(height: 10),
        BookHideButton(),
      ],
    ));
  }
}

class BookHideButton extends StatelessWidget {
  const BookHideButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var scannerState = context.watch<ScannerState>();

    var color = Colors.green;
    var text = "Hide book";
    var icon = Icons.visibility_off;

    if (scannerState.ownershipStatus == SetOwnershipStatusDtoStatusEnum.NONE) {
      text = "Add book and hide";
    }

    if (scannerState.isHidden) {
      color = Colors.red;
      text = "Unhide book";
      icon = Icons.visibility;
    }

    return FilledButton.icon(
        onPressed: scannerState.changingOwnership
            ? null
            : () => onHiddenPressed(context),
        icon: Icon(icon),
        label: Text(text),
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(color),
        ));
  }

  void onHiddenPressed(BuildContext context) async {
    var scannerState = context.read<ScannerState>();

    scannerState.setChangingOwnership(true);

    await setOwnershipStatus(scannerState.book!,
        SetOwnershipStatusDtoStatusEnum.OWNED, !scannerState.isHidden);

    var hiddenStatus = await getBookOwnershipStatus(scannerState.book!.isbn);
    scannerState.setHidden(hiddenStatus!.hidden);
    scannerState.setOwnershipStatus(
        fromOwnershipStatusDtoStatusEnum(hiddenStatus.status));

    scannerState.setChangingOwnership(false);
  }
}

class BookStatusButton extends StatelessWidget {
  const BookStatusButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var scannerState = context.watch<ScannerState>();

    var color = Colors.green;
    var text = "Add book to your collection";
    var icon = Icons.add;
    if (scannerState.ownershipStatus == SetOwnershipStatusDtoStatusEnum.OWNED) {
      color = Colors.red;
      text = "Remove book from your collection";
      icon = CupertinoIcons.trash;
    }

    return FilledButton.icon(
        onPressed: scannerState.changingOwnership
            ? null
            : () => onStatusPressed(context),
        icon: Icon(icon),
        label: Text(text),
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(color),
        ));
  }

  void onStatusPressed(BuildContext context) async {
    var scannerState = context.read<ScannerState>();

    scannerState.setChangingOwnership(true);

    await setOwnershipStatus(
        scannerState.book!,
        scannerState.ownershipStatus == SetOwnershipStatusDtoStatusEnum.OWNED
            ? SetOwnershipStatusDtoStatusEnum.NONE
            : SetOwnershipStatusDtoStatusEnum.OWNED,
        false);

    var ownershipStatus = await getBookOwnershipStatus(scannerState.book!.isbn);
    scannerState.setOwnershipStatus(
        fromOwnershipStatusDtoStatusEnum(ownershipStatus!.status));
    scannerState.setHidden(ownershipStatus.hidden);

    scannerState.setChangingOwnership(false);
  }
}

class BookCover extends StatelessWidget {
  const BookCover({
    super.key,
    required this.scannerState,
  });

  final ScannerState scannerState;

  @override
  Widget build(BuildContext context) {
    if (scannerState.book!.bookCoverId == null) {
      return const Center(
          child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off_rounded),
          SizedBox(width: 10),
          Text("No Book cover found"),
        ],
      ));
    }

    return CachedNetworkImage(
      imageUrl:
          "${globals.baseUrl}/books/cover/${scannerState.book!.bookCoverId}.png",
      imageBuilder: (context, imageProvider) => Container(
        decoration: BoxDecoration(
            image: DecorationImage(
          image: imageProvider,
          fit: BoxFit.contain,
        )),
      ),
      placeholder: (context, url) => Center(child: CircularProgressIndicator()),
      errorWidget: (context, url, error) => Center(child: Icon(Icons.error)),
    );
  }
}

class BookLoadingIndicator extends StatelessWidget {
  const BookLoadingIndicator({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var scannerState = context.watch<ScannerState>();

    if (scannerState.wasKnown) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(height: 10),
          Text("No one scanned this book before!"),
          SizedBox(height: 10),
          Text("Getting it for the first time may take up to 15 seconds.",
              style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

class BookNotFoundDisplay extends StatelessWidget {
  const BookNotFoundDisplay({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(CupertinoIcons.exclamationmark_triangle),
          SizedBox(width: 10),
          Text("Book not found"),
        ],
      ),
    );
  }
}

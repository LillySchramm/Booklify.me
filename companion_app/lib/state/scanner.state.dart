import 'package:booklify_api/booklify_api.dart';
import 'package:flutter/material.dart';

class ScannerState extends ChangeNotifier {
  String? scannedIsbn;

  bool loading = false;
  bool notFound = false;
  bool wasKnown = true;
  bool changingOwnership = false;
  bool isHidden = false;
  BookDto? book;
  PublisherDto? publisher;
  SetOwnershipStatusDtoStatusEnum? ownershipStatus;
  List<AuthorDto> authors = [];

  void reset() {
    loading = false;
    notFound = false;
    wasKnown = true;
    book = null;
    publisher = null;
    ownershipStatus = null;
    changingOwnership = false;
    authors = [];

    notifyListeners();
  }

  void setChangingOwnership(bool changing) {
    changingOwnership = changing;
    notifyListeners();
  }

  void setAuthors(List<AuthorDto> authors) {
    this.authors = authors;
    notifyListeners();
  }

  void setPublisher(PublisherDto? publisher) {
    this.publisher = publisher;
    notifyListeners();
  }

  void setNotFound(bool notFound) {
    this.notFound = notFound;
    notifyListeners();
  }

  void setOwnershipStatus(SetOwnershipStatusDtoStatusEnum? status) {
    ownershipStatus = status;
    notifyListeners();
  }

  void setHidden(bool hidden) {
    isHidden = hidden;
    notifyListeners();
  }

  void setBook(BookDto? book) {
    this.book = book;
    notifyListeners();
  }

  void setLoading(bool loading) {
    this.loading = loading;
    notifyListeners();
  }

  void setScannedIsbn(String? isbn) {
    scannedIsbn = isbn;
    notifyListeners();
  }

  void setWasKnown(bool wasKnown) {
    this.wasKnown = wasKnown;
    notifyListeners();
  }
}

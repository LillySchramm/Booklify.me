# Changelog

## v1.1.0  - 12.1.2024

### Added

- Added the ability to hide books from the public account page. 
- Added the ability to exclude books from the auto grouping algorithms. (Usefull for excluding false-positives) 
- Added a new interaction menu for the book cards. 
- Added a 'Add And Hide' button to the add book dialog. 
- Add-An-Hide has been added to the Companion App 
- Added an author filter to the collection pages.  
### Changed

- Refined the automatic book grouping. 
- Greatly improved frontend performance for collections with many books. 
### Removed

- Collections with only one book are no longer collapsed by default. 
### Fixed

- Fixed a bug, which caused inactive users to be logged out. 
- Fixed a bug, which caused the sidenav info about a book to not update correctly. 
- Fixed a bug, which caused the backend to indicate a system error if a book could not be found.  
- Fixed a bug which prevented signup if recaptcha was disabled. 
- If no books match the given filter an appropriate message will be displayed. 


## v1.0.3  - 31.12.2023

### Added

- Added a loading indicator for the collection page. 
### Changed

- Icons are now served by Booklify instead of Google. 
- Fonts are now served by Booklify instead of Google. 
- Updated the app icon. (Credits to [Lonaasan](https://shadowlona.dev)) 
- Improved search times by an average of 40% when getting a book for the first time. 
- Improved the error feedback if a book was not found. 
### Fixed

- Fixed webmanifest for frontend. 
- Fixed a race condition, which sometimes logged out users with valid sessions. 
- Fixed a bug which caused the frontend to send mallformated ISBNs to the backend. 
- Fixed the scheduling of invalidation outdated sessions. 
- Fixed some typos. 
- Added a fallback when visiting an url which does not exist. 


## v1.0.2  - 31.12.2023

### Fixed

- Fixed a rare error while grouping books, that sometimes occurred when a book had no number in its title.  
- Fixed an issue which prevented a book to be found if OpenLibrary returned malformed data. 


## v1.0.1  - 30.12.2023

> Fixing a few day one issues.

### Added

- Improved the UI Feedback when adding a book to the collection. 
### Changed

- Books now only get sorted into their series if at least one other book of this series is present in the collection. 
### Fixed

- Fixed the name of the Android App 
- Fixed a bug which caused the book groups to jitter in older browsers. 
- Fixed a bug which sometimes did not let users add books if they have to few in their collection. 
- Fixed the book series detection in certain cases where the title was weirdly formated by the publisher. 


## v1.0.0  - 29.12.2023

> The first release of Booklify

No Changes 


/**
 * The onOpen function runs automatically when the Google Docs document is
 * opened. Use it to add custom menus to Google Docs that allow the user to run
 * custom scripts. 
 *
 * references: https://developers.google.com/apps-script/guides/docs, https://stackoverflow.com/questions/54903568/inserting-template-text-in-a-google-doc-in-google-apps-script
 */
function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  DocumentApp.getUi()
      .createMenu('Templates')
      .addItem('Insert Words', 'insertWordsAtCursor')
      .addItem('Insert Date', 'insertDateAtCursor')
      .addToUi();
  
}
/**
 * Inserts date and template text at the current cursor location.
 */
function insertWordsAtCursor() {
  var doc = DocumentApp.getActiveDocument();  
  var cursor = doc.getCursor();  

  if (cursor) {
    // Attempt to insert text at the cursor position. If insertion returns null,
    // then the cursor's containing element doesn't allow text insertions.
    var longDate = Utilities.formatDate(new Date(), "GMT", "MMMM dd, yyyy"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"
    var body = doc.getBody();
  
    var offset = body.getChildIndex(cursor.getElement());
    body.insertParagraph(++offset, longDate).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    topics = ["Attendees", "Updates", "Upcoming Events", "Action Items"] //CHANGE topics TO YOUR TOPICS
    topics.forEach(function(topic, i) {
      body.insertListItem(++offset, topic + ": ").setGlyphType(DocumentApp.GlyphType.BULLET);
    });

    } else {
      DocumentApp.getUi().alert('Cannot insert text at this cursor location.');
    }
  }
/**
 * Inserts the date at the current cursor location at a specified font size.
 */
function insertDateAtCursor() {
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    // Attempt to insert text at the cursor position. If insertion returns null,
    // then the cursor's containing element doesn't allow text insertions.
    var longDate = Utilities.formatDate(new Date(), "GMT", "MMMM dd, yyyy"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"
    var element = cursor.insertText(longDate);
    if (element) {
      element.setFontSize(20)
    } else {
      DocumentApp.getUi().alert('Cannot insert text at this cursor location.');
    }
  } else {
    DocumentApp.getUi().alert('Cannot find a cursor in the document.');
  }
}

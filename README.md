# Description
  A simple web-based income and expense tracker that allows users to manage their finances by recording income and expenses, while displaying the net balance. The application supports data persistence using sessionStorage, so the data is saved across page reloads during the session.

# Installation Instructions
  To run this project locally, follow these steps:

  1. Clone the repository to your local machine:
     git clone https://github.com/suriya267/trackmyfunds.git

  2. Navigate to the project directory:
     cd trackmyfunds\public

  3. Open the index.html file in your browser.
     open index.html  # or simply double-click the file to open in your browser
     That's it! You're ready to calculate income and expenses.

# Features
  1. Add income and expense entries with descriptions and amounts.
  2. Edit and delete entries.
  3. View total income, total expenses, and the net balance.
  4. Filter entries by All, Income, or Expense types.
  5. Data is stored in the session (temporary storage).
  6. Clear all data with a reset button.

# Technologies Used
  HTML5: For the structure of the web page.
  CSS: Tailwind CSS and CSS3 for styling.
  JavaScript: For the functionality of adding, editing, deleting, and filtering entries.
  SessionStorage: To persist the data temporarily within a browser session.

# Usage
  # Adding Entries
    1. Enter Description: Add a description for your income or expense (e.g., "Salary", "Groceries").
    2. Enter Amount: Add the amount for the entry (e.g., "5000", "150").
    2. Choose Entry Type: Select whether the entry is an "Income" or "Expense" using the radio buttons.
    4. Add Entry: Click the "Add" button to save the entry.
  # Editing Entries
    1. Click the "Edit" button next to any entry to modify the description or amount.
    2. The entry will be loaded into the input fields, allowing for editing.
    3. After editing, click "Save" to update the entry.
  # Deleting Entries
    Click the "Delete" button next to any entry to remove it from the list.
  # Resetting Data
    Click the "Reset" button to clear all entries, and reset the session storage.
  # Filtering Entries
    Use the radio buttons under "Entry List" to filter by:
     1. All: Shows both income and expense entries.
     2. Income: Shows only income entries.
     3. Expense: Shows only expense entries.
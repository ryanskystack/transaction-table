## Installation

1) Clone this repo to your machine
2) Run `npm install` to install the dependencies
3) Run `npm start` to run the app in development mode
4) Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Objective
To implement a transaction table to make it easy to see what’s happening at a simple glance.

## Requirements
- Please implement a transaction table that displays the provided data, Having the following columns in your table:
    - Status
    - Date
    - Merchant Name
    - Team Member
    - Category (dropdown list of category names)
    - Amount
    - GST
    - Budget
    - Receipt (read-only checkbox)
    - Billable (checkbox)

- Implement a search feature that can take any input in the search bar and display any matching transactions in the table. Fields that should be searched are:
    - Merchant Name
    - Team Member
    - Category Name
    - Budget
    - Amount
    - GST   


## Solutions

1. Analyze and process the data to obtain an array suitable for generating tables directly. This involves completing corresponding helper functions, including testing.
2. Utilize the obtained helper functions to process the raw data and generate React component tables.
3. Implement a pagination component for facilitating pagination.
4. Add filtering functionality components for the "status," "merchantName," "Category," and "budget" columns. These components should provide dropdown menu options for users to select for filtering. Upon selecting an option, the data should be filtered accordingly.
5. Incorporate a search bar component, allowing users to search for team members, amount, and GST.
6. Introduce a reset button for resetting the search functionality.
7. Streamline the logic, particularly the sequence of data processing algorithms, to ensure proper functionality.
8. Conduct refactoring work for continuous optimization.
9. Enhance the UI by applying styling to improve visual appeal.
10. Perform testing on each React component.


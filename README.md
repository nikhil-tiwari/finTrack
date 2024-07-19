# Personal Finance Tracker

A modern web application designed to help users track their income and expenses efficiently. Built with React and various libraries, this app provides a seamless experience for managing personal finances.

## Live Demo

You can view the live application [here](https://fin-track-seven.vercel.app/). The application is deployed on Vercel for seamless hosting and performance.

## Features

- **User Authentication**: Sign up and log in with email/password or Google accounts using Firebase Authentication.
- **Expense & Income Tracking**: Add, view, and categorize your transactions (income and expenses) with ease.
- **Data Visualization**: Visualize your financial data with interactive charts using Victory.js.
- **Search & Filter**: Filter and search through your transactions to find specific records.
- **CSV Import/Export**: Import and export transactions using CSV files for easy data management.
- **Responsive Design**: Optimized for various screen sizes, providing a great user experience on both desktop and mobile devices.

## Usage

1. **Sign Up/Sign In:**
   - Create a new account or sign in using your existing credentials. You can also use Google sign-in for quicker access.

2. **Add Transactions:**
   - Use the modals provided to add income or expense transactions. Fill in the required details such as amount, category, and date.

3. **View Transactions:**
   - View your transactions in a table format. You can filter and sort transactions based on criteria like date, amount, or category.

4. **Export/Import CSV:**
   - **Export:** Download your transactions as a CSV file for offline analysis or record-keeping.
   - **Import:** Upload transactions from a CSV file to add them to your financial records.

## Technologies Used

- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Ant Design**: For UI components and styling.
- **Firebase**: For authentication and real-time database.
- **Victory.js**: For creating charts and visualizations.
- **React Router DOM**: For routing and navigation.
- **React Toastify**: For displaying pop-up messages and notifications.
- **PapaParse**: For parsing CSV files.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/personal-finance-tracker.git
    ```

2. Navigate to the project directory:

    ```bash
    cd personal-finance-tracker
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up Firebase by adding your Firebase configuration to the `firebase.js` file. 

   Ensure you have the required Firebase keys stored in a `.env` file at the root of the project. The `.env` file should include:

    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

   You will need to create your own Firebase setup and replace the placeholders with your Firebase configuration details.

5. Start the development server:

    ```bash
    npm start
    ```

## Contact

For any inquiries or feedback, you can reach out to me at [nikhiltiwarig99@gmail.com](mailto:nikhiltiwarig99@gmail.com).
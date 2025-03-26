# 🏡 CloudStay Frontend

**CloudStay** is a modern web application designed to provide a seamless experience for users to book accommodations and for hosts to manage their properties. The platform offers features for browsing properties, viewing detailed information, managing bookings, and secure authentication.

## 🌐 Live Website

[CloudStay Frontend](https://cloudstay-frontend.vercel.app/)

## 📂 Repository

[Frontend Repository](https://github.com/mdferdausalam19/cloudstay-frontend)

## ✨ Key Features

### 🌟 Core Features

- **Responsive Design**: Fully responsive layout ensuring a consistent experience across various devices (desktops, tablets, and mobile phones).
- **User Authentication**: Secure user registration and login functionality.
- **Role-Based Access**: Different user roles (Guest, Host, Admin) with specific permissions and views.
- **Private Routes**: Protected access to specific sections of the application based on user authentication and role.
- **Secure Booking System**: Guests can book available rooms with instant booking or host approval options.
- **Property Management**: Hosts can list their properties with details like photos, descriptions, amenities, availability and pricing.
- **Dashboard**: Statistics and booking management pages for guests and hosts.
- **User Profile**: Detailed profile pages for users with information and update actions.
- **Payment Gateway Integration**: Secure payment transactions using Stripe.
- **Notifications**: Automatic email notification system for booking and user actions.

### 🏠 Guest Features

- Browse available rooms.
- Book rooms.
- Manage bookings.
- Request host role.
- View and update profile.

### 💼 Host Features

- All guest features.
- List properties for rent.
- Manage property listings.
- Manage bookings.
- View and update profile.

### 🛡️ Admin Features

- Statistics dashboard.
- User management.
- Change user roles.
- View and update profile.

### ➕ Additional Features

- Form validation.
- Loading spinners.
- Reusable UI components.
- Error Page

## 🛠️ Technologies Used

### ⚡ Frameworks & Libraries:

- **React**: For building the dynamic frontend UI.
- **React Router**: For seamless client-side routing and navigation.
- **Tailwind CSS**: For responsive and modern styling.
- **@headlessui/react**: For accessible UI components.
- **@stripe/react-stripe-js** and **@stripe/stripe-js**: For payment processing.
- **date-fns**: For date manipulation.

### ➕ Additional Dependencies:

- **@tanstack/react-query**: For fetching, caching, and managing server state.
- **axios**: For handling HTTP requests.
- **firebase**: For authentication and Firebase services.
- **prop-types**: For type checking.
- **query-string**: For parsing and stringifying URL query strings.
- **react-date-range**: For date range selection.
- **react-dom**: For DOM interactions in React apps.
- **react-google-charts**: For rendering Google Charts.
- **react-helmet-async**: For managing document head tags.
- **react-hook-form**: For form management and validation.
- **react-hot-toast**: For toast notifications.
- **react-icons**: For using icons.
- **react-router**: For routing.
- **react-spinners**: For loading spinners.
- **sweetalert2**: For enhanced alert dialogs.
- **vite**: For the build tool.

## 🗂️ Project Structure

```plaintext
cloudstay-frontend/
├── public/
│   └── (Static assets like favicon, images, etc.)
├── src/
│   ├── api/
│   │   └── (API-related utilities and fetch functions)
│   ├── components/
│   │   ├── Categories/
│   │   ├── Dashboard/
│   │   │   ├── Charts/
│   │   │   ├── Sidebar/
│   │   │   │   └── Menu/
│   │   │   └── TableRows/
│   │   ├── Form/
│   │   ├── Home/
│   │   ├── Modal/
│   │   ├── RoomDetails/
│   │   └── Shared/
│   │       ├── Button/
│   │       ├── Footer/
│   │       ├── Navbar/
│   │       └── Utility Components (EmptyState, Heading, Spinner, etc.)
│   ├── firebase/
│   │   └── (Firebase configuration and related files)
│   ├── hooks/
│   │   └── (Custom React hooks)
│   ├── layouts/
│   │   └── (Page layout components)
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Admin/
│   │   │   ├── Common/
│   │   │   ├── Guest/
│   │   │   ├── Host/
│   │   │   └── RoomDetails/
│   │   ├── Home/
│   │   ├── RoomDetails/
│   │   ├── SignIn/
│   │   ├── SignUp/
│   │   └── ErrorPage/
│   ├── providers/
│   │   └── (Context Providers for global state management)
│   ├── routes/
│   │   └── (Route-related components and private routes)
│   ├── index.css
│   └── main.jsx
├── .env.local
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure that you have **Node.js** and **npm** installed on your system.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mdferdausalam19/cloudstay-frontend.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd cloudstay-frontend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Firebase**:

   - Create a `.env.local` file and add the following environment variables:

   ```bash
   VITE_APIKEY=your_api_key
   VITE_AUTHDOMAIN=your_auth_domain
   VITE_PROJECTID=your_project_id
   VITE_STORAGEBUCKET=your_storage_bucket
   VITE_MESSAGINGSENDERID=your_sender_id
   VITE_APPID=your_app_id
   VITE_API_URL=your_backend_api
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 Resources

### **Frameworks & Libraries**

-   **React Ecosystem**:
    -   [React](https://react.dev): For building the user interface.
    -   [React Router](https://reactrouter.com): For single-page application routing.
    -   [React Hook Form](https://react-hook-form.com): For form management and validation.
    -   [@headlessui/react](https://headlessui.com/): For building accessible UI components.
    -   [React DOM](https://react.dev/reference/react-dom):  For interacting with the DOM.
    -   [React Helmet Async](https://github.com/staylor/react-helmet-async): For managing document head tags.
    -   [React Date Range](https://github.com/hypeserver/react-date-range): For date range selection in the UI.
    -   [React Google Charts](https://react-google-charts.com/): For rendering data visualizations.
-   **Styling**:
    -   [Tailwind CSS](https://tailwindcss.com): For utility-first CSS styling.
-   **Payment Integration**:
    -   [@stripe/react-stripe-js](https://stripe.com/):  For integrating Stripe's React components.
    -   [@stripe/stripe-js](https://stripe.com/):  For Stripe's JavaScript library.

### **Data Management & API**

-   [@tanstack/react-query](https://tanstack.com/query/latest): For data fetching, caching, and state management.
-   [Axios](https://axios-http.com/): For making HTTP requests to the backend API.
-   [Query String](https://www.npmjs.com/package/query-string): For parsing and stringifying URL query strings.

### **Firebase**

-   [Firebase](https://firebase.google.com/): For user authentication and other backend services.

### **Utilities**

-   [date-fns](https://date-fns.org/): For date manipulation and formatting.
-   [prop-types](https://www.npmjs.com/package/prop-types): For type checking React components.
-   [react-hot-toast](https://react-hot-toast.com/): For displaying toast notifications.
-   [react-icons](https://react-icons.github.io/react-icons): For using various icons in the UI.
-   [react-spinners](https://www.npmjs.com/package/react-spinners): For loading spinner components.
-   [sweetalert2](https://sweetalert2.github.io/): For creating beautiful and customizable alert/modal dialogs.
-   [vite](https://vitejs.dev/):  For the development build tool.
# Project Overview

This is a web application for **CB Automobile**, a service provider in Germany offering a range of automotive and financial solutions. The application is built with **React** and **Vite**, and it uses **TypeScript**. It is a multi-language application that supports Romanian, German, English, and Italian. The UI is styled with **Tailwind CSS** and uses icons from the **lucide-react** library.

The application showcases the company's services, which include:
- Car Sales
- Car Financing & Orders
- Personal Loans
- Insurance
- Car Registration
- Zoll / Export Plates
- Financial Consulting
- Legalized Translations
- Schufa Cleaning Help
- Car Service (Car Checks)

The application also features a car sales section with a detailed view of each vehicle.

## Building and Running

### Prerequisites

- Node.js
- A Gemini API key

### Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Build for Production

To create a production build, run:
```bash
npm run build
```
This will generate a `dist` folder with the optimized static assets.

### Preview Production Build

To preview the production build locally, run:
```bash
npm run preview
```

## Development Conventions

### Technologies
- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Routing**: react-router-dom

### Project Structure
- **`src`**: This is the main folder that is not present in the current project, it is recommended to create it and move all the files inside it except for the configuration files.
- **`components`**: Contains reusable React components like `Navbar`, `ServiceCard`, `CarCard`, etc.
- **`constants`**: The `constants.ts` file contains all the static content for the application, including multilingual text and data for services and cars.
- **`types`**: The `types.ts` file defines the data structures used throughout the application.
- **`services`**: Contains the logic for interacting with external services like the Gemini API.

### State Management
The application uses React's `useState` and `useEffect` hooks for managing component-level state. The selected language is persisted in the browser's local storage.

### Content Management
All the text content is managed in the `constants.ts` file. The content is structured by language, making it easy to add or modify translations. This approach also allows for easy content updates without touching the component logic.

---

## Session Updates

### Removed "Savings Plans" Service
The "Planuri de economii pentru Adulti si Juniori" service has been removed from the application as per user request.
-   **`constants.ts`**: The corresponding `ServiceData` object with `id: 'savings-plans'` has been removed from the `SERVICES` array.

### Enhanced Service Details and Partner Information

The way service details are presented and how partner information is structured has been significantly enhanced to support multilingual descriptions and custom detail sections for specific partners.

#### `types.ts` Changes:
-   **`Partner` Interface**: The `description` field of the `Partner` interface was changed from `string` to `Record<Language, string>` to allow for multilingual descriptions.
-   **New Interfaces**:
    -   `RegistrationDetails`: Added to define a structured content type for car registration services, including header, subtitle, and an array of plates with multilingual titles and descriptions.
    -   `CarCheckDetails`: Added to define a structured content type for car check services, containing an array of items with icons, multilingual titles, and descriptions.
-   **`Partner` Interface Extension**: The `Partner` interface was extended to optionally include `registrationDetails?: RegistrationDetails;` and `carCheckDetails?: CarCheckDetails;` to support custom detailed content for specific partners.

#### `constants.ts` Changes:
-   **Partner Descriptions**:
    -   The `description` fields for `tudoseAlexandruFinanz`, `p-cr85-auto`, and `p-cr85-info` partners have been updated to `Record<Language, string>` and now contain translations for Romanian, German, English, and Italian.
-   **`p-cr85-info` Partner (`car-registration` service)**:
    -   A new `registrationDetails` object has been added to this partner. This object contains:
        -   `header`: "Serviciile noastre" (Our Services) and its translations.
        -   `subtitle`: "NUREMBERG, FÜRTH, ERLANGEN AND MUCH MORE" and its translations.
        -   `plates`: An array of objects, each representing a type of registration plate with multilingual titles (corrected Romanian translations) and descriptions.
-   **`p-cr85-auto` Partner (`car-check` service)**:
    -   A new `carCheckDetails` object has been added to this partner. This object contains an array of 6 items, each with:
        -   `icon`: A Lucide icon name (e.g., 'ShieldCheck', 'Wrench').
        -   `title`: A multilingual title (e.g., "Security of the transaction" and its translations).
        -   `description`: A multilingual description (e.g., "Checking the car for hidden deficiencies..." and its translations).

#### `App.tsx` Changes:
-   **`CONTENT.common.details`**: A new translation entry for "Detalii" (Details) has been added to `CONTENT.common` to be used for the new details button.
-   **`ServiceDetailPage` Component**:
    -   The state management for the service details modal has been updated from `const [showServiceDetails, setShowServiceDetails] = useState<boolean>(false);` to `const [serviceDetailsModalData, setServiceDetailsModalData] = useState<{service: ServiceData, partner: Partner} | null>(null);` to pass both the service and the specific partner to the modal.
    -   The `useEffect` that controls body scroll now also accounts for `serviceDetailsModalData`.
    -   The "Viziteaza Site" button for partners has been replaced with a "Detalii" button.
    -   The `onClick` handler for this new "Detalii" button now sets `serviceDetailsModalData({service, partner})`.
-   **`ServiceDetailsModal` Component**:
    -   The component now accepts `service: ServiceData` and `partner: Partner` as props.
    -   Conditional rendering logic has been implemented:
        -   If `service.id` is 'car-registration' and `partner.id` is 'p-cr85-info' and `partner.registrationDetails` exists, it renders the structured content from `partner.registrationDetails` (header, subtitle, and plates list).
        -   If `service.id` is 'car-check' and `partner.id` is 'p-cr85-auto' and `partner.carCheckDetails` exists, it renders a responsive grid (1 column on mobile, 3 columns on desktop) of items from `partner.carCheckDetails`. Each item displays an icon, a bold and underlined title, and a description.
        -   Otherwise, it falls back to rendering the generic `service.title` and `service.longDescription`.
    -   The modal now uses `max-w-4xl` for wider content when displaying structured details.

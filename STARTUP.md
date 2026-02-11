# Frontend Startup Guide

## Prerequisites
- Node.js 18+ installed
- npm installed
- Backend API running at `http://localhost:5033`

## Installation & Running

1. **Navigate to frontend directory:**
   ```bash
   cd /Users/75way-mbair-05/RiderProjects/InventoryFullStack/inventory-tracker-ui
   ```

2. **Install dependencies (first time only):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   Or alternatively:
   ```bash
   ng serve
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:4200`

## Common Issues

### Port Already in Use
If port 4200 is already in use:
```bash
ng serve --port 4201
```

### Build Errors
If you encounter build errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Errors
Ensure the backend is running and has CORS configured for `http://localhost:4200`

## Test Credentials

You'll need to register users first, or use existing users from your database.

**Roles:**
- WarehouseManager - Full inventory management access
- Vendor - Product catalog and performance access

## Development Notes

- The app uses Angular 21 with standalone components
- Material Design UI components
- JWT authentication with role-based routing
- All changes are hot-reloaded automatically

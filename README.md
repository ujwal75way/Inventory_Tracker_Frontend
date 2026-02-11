# 📦 Multi-Vendor Inventory & Warehouse Tracker - Frontend

A comprehensive Angular-based solution for managing multi-vendor inventory across various warehouse locations. This platform enables seamless communication between Warehouse Managers and Vendors, providing real-time data visibility and robust stock management.

---

## 👥 Roles & Access Control

### 🏗️ Warehouse Manager
The administrative role responsible for logistical operations, stock health, and warehouse-to-warehouse coordination.

### 🏪 Vendor
The product owner role focused on monitoring their own catalog, pricing, and individual product performance.

---

## 🛠️ Warehouse Manager Modules

### 📊 Inventory Dashboard
*   **Unified Visibility**: View all inventory across multiple vendors in a single location.
*   **High Performance**: Built with **Angular CDK Virtual Scroll** to handle thousands of data points with smooth scrolling.
*   **Visual Stock Health**: 
    *   🟡 **Low Stock**: Items nearing reorder levels are highlighted for proactive restocking.
    *   🔴 **Out of Stock**: Items with zero quantity are immediately flagged.
*   **Dynamic Grouping**: Flexibility to group data by **Vendor** or **Category** for better decision-making.
*   **Sticky UI**: Interactive tables with sticky headers to maintain context during massive data exploration.

### 🔄 Stock Adjustment
*   **Movement Tracking**: Precise recording of all stock movement entries.
*   **Multiple Adjustment Types**:
    *   📥 **Stock In**: Increase inventory for new arrivals.
    *   📤 **Stock Out**: Reduce inventory for shipments or adjustments.
    *   🚛 **Transfer**: Seamlessly move inventory between different warehouse locations.
*   **History Log**: Comprehensive view of recent stock adjustments for auditing and tracking.

### 📥 Bulk Stock Operations
*   **Excel Upload**: Support for `.xlsx` and `.xls` files to update stock quantities in batches.
*   **Data Validation**: Intelligent verification of incoming data against existing inventory records.
*   **Partial Success Logic**: Handles large files gracefully, showing a summary of successful rows and detailed errors for failed ones.
*   **Onboarding Support**: Downloadable sample Excel format to ensure data consistency.

---

## 📦 Vendor Modules

### 📜 Product Catalog
*   **Ownership Focus**: Vendors only see the products they own.
*   **Real-time Stock**: Monitor live stock status across all assigned warehouses.
*   **Status Indicators**: Immediate visual feedback on product availability and stock-out risks.
*   **Inline Editing**: Update product pricing directly within the catalog for rapid market adjustments.

### 📈 Product Performance
*   **Movement Summary**: Deep dive into how products are moving through the system.
*   **Velocity Tracking**: Identify **Fast-Moving** and **Slow-Moving** items at a glance.
*   **Restock Insights**: Track restock frequency to optimize future production and delivery schedules.

---

## 🚀 Technical Highlights & UX

*   **State Persistence**: Sophisticated state management that maintains search and filter states across navigation.
*   **Search Pipe Architecture**: Custom **Angular Pipe** for local filtering by SKU or Category, ensuring lightning-fast search performance without redundant API calls.
*   **Real-time Notifications**: Immediate feedback for managers on every stock operation (Success/Failure) via stylized snackbars.
*   **Data Integrity**: Strict validation rules blocking negative stock values at the form level to prevent data corruption.
*   **Modern Interaction**: Implementation of **Angular Signals** for reactive and predictable state changes.

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 21+
- Backend API running at `http://localhost:5033`

### Installation
1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:4200`

---

## 📝 Rules and Constraints
- Inventory values must never become invalid.
- Stock updates reflect real-world physical movement.
- All code follows strict TypeScript typing (No `any`).
- Local search performance optimized via custom pipes.

Video :- https://drive.google.com/file/d/1k4gB0acpYx9FKZp-hEw5Wb_LkORhEkMm/view?usp=sharing

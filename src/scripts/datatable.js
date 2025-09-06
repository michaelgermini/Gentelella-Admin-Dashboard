// DataTable initialization for Gentelella Admin Dashboard
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

export function initializeDataTable() {
    // Initialize main transactions table
    const transactionsTable = $('#transactionsTable');
    if (transactionsTable.length) {
        transactionsTable.DataTable({
            responsive: true,
            pageLength: 10,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records..."
            },
            columnDefs: [
                {
                    targets: -1,
                    orderable: false
                }
            ],
            initComplete: function() {
                // Add search input wrapper
                $('.dataTables_filter input').addClass('form-control');
                $('.dataTables_filter').addClass('mb-3');
            }
        });
    }

    // Initialize additional tables if they exist
    const otherTables = ['.datatable', '#usersTable', '#productsTable'];
    otherTables.forEach(selector => {
        const table = $(selector);
        if (table.length && !$.fn.DataTable.isDataTable(table)) {
            table.DataTable({
                responsive: true,
                pageLength: 25,
                order: [[0, 'asc']],
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search..."
                }
            });
        }
    });
}

// Function to refresh table data
export function refreshTable(tableId) {
    const table = $(`#${tableId}`);
    if (table.length && $.fn.DataTable.isDataTable(table)) {
        table.DataTable().ajax.reload();
    }
}

// Function to add new row to table
export function addTableRow(tableId, data) {
    const table = $(`#${tableId}`);
    if (table.length && $.fn.DataTable.isDataTable(table)) {
        table.DataTable().row.add(data).draw();
    }
}

// Function to update existing row
export function updateTableRow(tableId, rowIndex, data) {
    const table = $(`#${tableId}`);
    if (table.length && $.fn.DataTable.isDataTable(table)) {
        table.DataTable().row(rowIndex).data(data).draw();
    }
}

// Function to remove row from table
export function removeTableRow(tableId, rowIndex) {
    const table = $(`#${tableId}`);
    if (table.length && $.fn.DataTable.isDataTable(table)) {
        table.DataTable().row(rowIndex).remove().draw();
    }
}

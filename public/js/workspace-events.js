$(document).ready(() => {
  if (!Array.isArray(window.sessionEvents)) {
    return;
  }

  const tableBody = $('#events-table tbody');

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
  };

  window.sessionEvents.forEach((eventItem) => {
    tableBody.append(`
      <tr>
        <td>${eventItem.event_id}</td>
        <td>${eventItem.title}</td>
        <td>${eventItem.summary}</td>
        <td>${eventItem.status}</td>
        <td>${eventItem.severity}</td>
        <td>${formatDate(eventItem.first_seen)}</td>
        <td>${formatDate(eventItem.last_seen)}</td>
        <td>${formatDate(eventItem.created_at)}</td>
        <td>${formatDate(eventItem.updated_at)}</td>
      </tr>
    `);
  });

  $('#events-table').DataTable({
    pageLength: 5,
    order: [[5, 'desc']],
  });
});

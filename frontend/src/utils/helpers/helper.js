import { saveAs } from "file-saver";
// var Blob = require("blob");
export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function exportSheet(data) {
  const records = data.data;
  let formatedRecords = [];
  let notes = [];
  for (let i = 0; i < records.length - 1; i++) {
    if (i === records.length - 2) {
      notes.push(records[i].detail);
      if (records[i].added === records[i + 1].added) {
        notes.push(records[i + 1].detail);
        formatedRecords.push({
          date: records[i].added,
          totalTime: records[i].duration_sum,
          row: notes,
        });
      } else {
        formatedRecords.push({
          date: records[i].added,
          totalTime: records[i].duration_sum,
          row: notes,
        });
        formatedRecords.push({
          date: records[i + 1].added,
          totalTime: records[i + 1].duration_sum,
          row: [records[i + 1].detail],
        });
        break;
      }
    } else if (records[i].added === records[i + 1].added) {
      notes.push(records[i].detail);
      continue;
    } else {
      notes.push(records[i].detail);
      formatedRecords.push({
        date: records[i].added,
        totalTime: records[i].duration_sum,
        row: notes,
      });
      notes = [];
      continue;
    }
  }
  let bodyText = "";
  formatedRecords.map((row) => {
    let notes = "";
    row.row.map((note) => {
      notes += `<tr><td>* ${note}</td></tr>`;
    });
    bodyText += `<tr class="tr">
    <td style="padding-left: 10px">${row.date}</td>
    <td>${row.totalTime} h</td>
    <td>
      <table>
        ${notes}
      </table>
    </td>`;
  });
  const htmlContext = `<!DOCTYPE html>
  <html>
    <style>
      .table {
        border: 1px dashed grey;
        padding: 10px;
        border-collapse: collapse;
      }
      .tr {
        border: 1px dashed grey;
      }
    </style>
    <body>
      <h2>Records Table</h2>
  
      <table class="table" style="width: 100%;">
        <tr class="tr">
          <th style="text-align: left; width: 5%; padding: 10px;">Date</th>
          <th style="text-align: left; width: 5%">Total time</th>
          <th style="text-align: left; width: 40%">Notes</th>
        </tr>
        ${bodyText}
        </tr>
      </table>
    </body>
  </html>
  `;
  const blob = new Blob([htmlContext], {
    type: "text/html;charset=utf-8",
  });
  saveAs(blob, "hello world.html");
}

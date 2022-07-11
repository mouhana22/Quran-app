const express = require("express");
const fs = require("fs");
const Excel = require("exceljs");

var qArray = JSON.parse(fs.readFileSync("data.json").toString());

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // this is to accept data in json format
app.use(express.urlencoded()); // to decode gata send through html form
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    let studentName = req.body.studentName
    const workbook = new Excel.Workbook();
    var sheet = workbook.addWorksheet(studentName);    
  sheetStyling(sheet);
  creatTasksForSaving(sheet, qArray, req.body);
  creatTasksForRevision(sheet, qArray, req.body);
  workbook.xlsx.writeFile("myPlan.xlsx");
  /*
  res.status(200);
  res.setHeader('Content-Type', 'text/xlsx');
  res.setHeader(
        'Content-Disposition',
        `attachment; filename=myPlan.xlsx`
    );
    workbook.xlsx.write(res)
        .then(function () {
            res.end()
        });*/
});

app.post("/download", (req, res) => {
  res.download("./myPlan.xlsx", "myPlan.xlsx");
});


app.listen(port, () => console.log(`Listening on port ${port}...`));

function sheetStyling(sheet) {
  // set the sheet to be RTL
  sheet.views = [{ rightToLeft: true }];

  // row 1 style
  sheet.getCell("B1").font = { color: { argb: "FFFFFF" } };
  sheet.getCell("B1").value = "اسم الطالب";
  sheet.getCell("B1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472C4" },
  };

  sheet.getCell("E1").font = { color: { argb: "FFFFFF" } };
  sheet.getCell("E1").value = " الحلقة";
  sheet.getCell("E1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472C4" },
  };

  sheet.getCell("G1").font = { color: { argb: "FFFFFF" } };
  sheet.getCell("G1").value = "مقدار الحفظ اليومي";
  sheet.getCell("G1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472C4" },
  };

  sheet.getCell("I1").font = { color: { argb: "FFFFFF" } };
  sheet.getCell("I1").value = "رقم الخطة";
  sheet.getCell("I1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472C4" },
  };

  // row 2 style
  sheet.getRow(2).height = 20;
  for (let i = 65; i < 76; i++) {
    sheet.getCell(String.fromCharCode(i) + "2").font = {
      size: 8,
      color: { argb: "FFFFFF" },
    };
    sheet.getCell(String.fromCharCode(i) + "2").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4472C4" },
    };
    sheet.getCell(String.fromCharCode(i) + "2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    sheet.getCell(String.fromCharCode(i) + "2").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  }
  sheet.getCell("A2").value = "الواجب اليومي";
  sheet.getCell("B2").value = "تلقين المعلم للواجب";
  sheet.getCell("C2").value = "الحفظ من";
  sheet.getCell("D2").value = "الحفظ الى";
  sheet.getCell("E2").value = "المراجعة الصغرى من";
  sheet.getCell("F2").value = "المراجعة الصغرى الى";
  sheet.getCell("G2").value = "المراجعة الكبرى من";
  sheet.getCell("H2").value = "المراجعة الكبرى الى";
  sheet.getCell("I2").value = "الدرجة";
  sheet.getCell("J2").value = "التقدير";
  sheet.getCell("K2").value = "تاريخ الانجاز";

  // from A3 to K46
  let countar = 1;
  for (let i = 3; i < 47; i++) {
    // row 13, 24, 35, 46.
    if (i == 13 || i == 24 || i == 35 || i == 46) {
      let color = "";
      let msg = "";
      switch (i) {
        case 13:
          color = "A9D08E";
          msg = "* أحسنت لقد اجتزت ربع الخطة *";
          break;
        case 24:
          color = "F4B084";
          msg = "* ممتاز لقد اجتزت نصف الخطة *";
          break;
        case 35:
          color = "9BC2E6";
          msg = "* ما شاء الله أنت على وشك الإنتهاء من الخطة *";
          break;
        case 46:
          color = "F995AD";
          msg = "* مبارك عليك هذا الإنجاز ومزيد من التقدم والتفوق بإذن الله *";
          break;
      }
      for (let j = 65; j < 76; j++) {
        if (j == 67) {
          sheet.mergeCells("C" + i + ":H" + i);
          sheet.getCell("C" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("C" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("C" + i).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          sheet.getCell("C" + i).value = msg;
        }
        if (j == 65 || j == 66 || j == 73 || j == 74 || j == 75) {
          sheet.getCell(String.fromCharCode(j) + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell(String.fromCharCode(j) + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
        }
      }
      continue;
    }
    // row 3 to 12, 14 to 23, 25 to 34, 36 to 45
    for (let j = 65; j < 76; j++) {
      if (j == 65) {
        sheet.getCell("A" + i).value = countar;
        sheet.getCell("A" + i).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        sheet.getCell("A" + i).font = { bold: true };
        sheet.getCell("A" + i).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        countar++;
      } else if (j == 66 || j == 73 || j == 74 || j == 75) {
        sheet.getCell(String.fromCharCode(j) + i).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        sheet.getCell(String.fromCharCode(j) + i).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FAF7DB" },
        };
      } else {
        sheet.getCell(String.fromCharCode(j) + i).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        sheet.getCell(String.fromCharCode(j) + i).value = "---";
        sheet.getCell(String.fromCharCode(j) + i).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        sheet.getCell(String.fromCharCode(j) + i).font = { bold: true };
      }
    }
  }
}

function creatTasksForSaving(sheet, qArray, userInput) {
  let souraOfSavingIndex = parseInt(userInput.souraOfSaving);
  let amountOfSaving = parseInt(userInput.amountOfSaving);
  let countarOfAya = 0;
  let endOfTask = qArray[souraOfSavingIndex][countarOfAya].line_start;
  let pageOFEndOFtask = qArray[souraOfSavingIndex][countarOfAya].page;
  for (let i = 3; i < 46; i++) {
    if (i == 13 || i == 24 || i == 35) {
      continue;
    }
    endOfTask += amountOfSaving;
    while (endOfTask > 15) {
      endOfTask = endOfTask - 15;
      pageOFEndOFtask++;
    }

    while (true) {
      if (qArray[souraOfSavingIndex].length - 1 == countarOfAya) {
        sheet.getCell("C" + i).value =
          qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
        sheet.getCell("D" + i).value = "الخ";
        let count = 1;
        let j = i;
        while (count < 4) {
          if (j >= 45) {
            break;
          }
          if (sheet.getCell("E" + (j + count)).value != "---") {
            j++;
            continue;
          } else {
            sheet.getCell("E" + (j + count)).value =
              qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
            sheet.getCell("F" + (j + count)).value = "الخ";
            count++;
          }
          console.log("this " + count);
        }
        souraOfSavingIndex--;
        countarOfAya = 0;
        endOfTask = qArray[souraOfSavingIndex][countarOfAya].line_start;
        pageOFEndOFtask = qArray[souraOfSavingIndex][countarOfAya].page;
        break;
      }
      if (
        pageOFEndOFtask == qArray[souraOfSavingIndex][countarOfAya].page &&
        qArray[souraOfSavingIndex][countarOfAya].line_end >= endOfTask
      ) {
        console.log(countarOfAya);
        if (countarOfAya == 0) {
          sheet.getCell("C" + i).value =
            qArray[souraOfSavingIndex][countarOfAya].sura_name_ar + " 1";
          sheet.getCell("D" + i).value =
            qArray[souraOfSavingIndex][countarOfAya].aya_no;
        } else {
          sheet.getCell("C" + i).value =
            qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
          sheet.getCell("D" + i).value =
            qArray[souraOfSavingIndex][countarOfAya - 1].aya_no;
        }
        break;
      }

      countarOfAya++;
    }
  }
}

function creatTasksForRevision(sheet, qArray, userInput) {
  if (userInput.typeOfRevision == "1") {
    creatTasksForRevisionBySoura(sheet, qArray, userInput);
  } else {
    creatTasksForRevisionByLine(sheet, qArray, userInput);
  }
}

function creatTasksForRevisionByLine(sheet, qArray, userInput) {
  let souraOfRevisionIndex = parseInt(userInput.souraOfRevision);
  let amountOfRevision = parseInt(userInput.amountOfRevision);
  let countarOfAya = 0;
  let endOfTask = qArray[souraOfRevisionIndex][countarOfAya].line_start;
  let pageOFEndOFtask = qArray[souraOfRevisionIndex][countarOfAya].page;
  let startOfNextTask = "";
  sheet.getCell("G" + 3).value =
    qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " 1";
  for (let i = 3; i < 46; i++) {
    if (
      i == 13 ||
      i == 24 ||
      i == 35 ||
      sheet.getCell("E" + i).value != "---"
    ) {
      continue;
    }
    endOfTask += amountOfRevision;
    while (endOfTask > 15) {
      endOfTask = endOfTask - 15;
      pageOFEndOFtask++;
    }

    while (true) {
      if (
        pageOFEndOFtask == qArray[souraOfRevisionIndex][countarOfAya].page &&
        qArray[souraOfRevisionIndex][countarOfAya].line_end >= endOfTask
      ) {
        sheet.getCell("H" + i).value =
          qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar +
          " " +
          qArray[souraOfRevisionIndex][countarOfAya].aya_no;
        if (i != 3) {
          sheet.getCell("G" + i).value = startOfNextTask;
        }
        startOfNextTask = sheet.getCell("H" + i).value;

        break;
      }
      if (qArray[souraOfRevisionIndex].length - 1 == countarOfAya) {
        countarOfAya = 0;
        souraOfRevisionIndex++;
        
        if (souraOfRevisionIndex > 113) break;
        
        
      }

      countarOfAya++;
    }
  }
}

function creatTasksForRevisionBySoura(sheet, qArray, userInput) {
  let souraOfRevisionIndex = parseInt(userInput.souraOfRevision);
  let amountOfRevision = parseInt(userInput.amountOfRevision);
  for (let i = 3; i < 46; i++) {
    if (souraOfRevisionIndex > 113) {
      break;
    }
    if (
      i == 13 ||
      i == 24 ||
      i == 35 ||
      sheet.getCell("E" + i).value != "---"
    ) {
      continue;
    }
    if (amountOfRevision == 1) {
      sheet.getCell("G" + i).value =
        qArray[souraOfRevisionIndex][0].sura_name_ar + " 1";
      sheet.getCell("H" + i).value = "الخ";
      souraOfRevisionIndex++;
    } else {
      sheet.getCell("G" + i).value =
        qArray[souraOfRevisionIndex][0].sura_name_ar + " 1";

      souraOfRevisionIndex += amountOfRevision;
      if (souraOfRevisionIndex >= 113) {
        souraOfRevisionIndex = 114;
      }
      sheet.getCell("H" + i).value =
        qArray[souraOfRevisionIndex - 1][0].sura_name_ar + " الخ";
    }
  }
}

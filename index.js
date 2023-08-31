const express = require("express");
const fs = require("fs");
const Excel = require("exceljs");

var qArray = JSON.parse(fs.readFileSync("data.json").toString());

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // this is to accept data in json format
app.use(express.urlencoded()); // to decode gata send through html form
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const workbook = new Excel.Workbook();
  let length = Object.keys(req.body).length;
  for (let i = 1; i <= length / 8; i++) {
    let studentName = req.body["studentName" + i];
    let souraOfSaving = parseInt(req.body["souraOfSaving" + i]);
    let amountOfSaving = parseInt(req.body["amountOfSaving" + i]);
    let souraOfRevision = parseInt(req.body["souraOfRevision" + i]);
    let amountOfRevision = parseInt(req.body["amountOfRevision" + i]);
    let typeOfRevision = parseInt(req.body["typeOfRevision" + i]);
    let startOfRevision = parseInt(req.body["startOfRevision" + i]);
    let typeOfSaving = parseInt(req.body["typeOfSaving" + i]);

    var sheet = workbook.addWorksheet(studentName);

    sheetStyling(sheet, studentName, req.body.halaqaName);

    souraOfSaving !== 0
      ? creatTasksForSaving(
          sheet,
          qArray,
          souraOfSaving,
          amountOfSaving,
          typeOfSaving
        )
      : " ";
    creatTasksForRevision(
      sheet,
      qArray,
      souraOfRevision,
      amountOfRevision,
      typeOfRevision,
      startOfRevision
    );
    sheet.getCell("G1").value = amountOfSaving;
    sheet.getCell("I1").value = amountOfRevision;
    sheet.insertRow(1);
    
    sheet.getCell("B1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("C1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("D1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("E1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("F1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("G1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("H1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("I1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("J1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FCE5CD" },
    };
    sheet.getCell("A1").font = { color: { argb: "000000" } };
    sheet.getCell("A1").value = ":الاسم";
    sheet.getCell("A1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9D9D9" },
    };
    sheet.getCell("B1").value = studentName;

    sheet.getCell("F1").font = { color: { argb: "000000" } };
    sheet.getCell("F1").value = ":الحلقة";
    sheet.getCell("F1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9D9D9" },
    };
    sheet.getCell("G1").value = req.body.halaqaName;
  }

  let filename = encodeURIComponent(req.body.halaqaName + ".xlsx");
  res.status(200);
  //res.setHeader('Content-Type', 'txt/xlsx');
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment;filename*=UTF-8''" + filename
  );
  workbook.xlsx.write(res).then(function () {
    res.end();
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

function sheetStyling(sheet, studentName, halaqaName) {
  // set the sheet to be RTL
  sheet.views = [{ rightToLeft: true }];
  // student name
  //sheet.getCell("C1").value = studentName;
  sheet.getCell("C1").font = { bold: true };
  // halaqa name
  //sheet.getCell("F1").value = halaqaName;
  sheet.getCell("F1").font = { bold: true };
  // row 1 style
  sheet.getCell("A1").font = { color: { argb: "000000" } };
  sheet.getCell("A1").value = "الهدف";
  sheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D9D9D9" },
  };

  sheet.getCell("B1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("C1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("D1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("E1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("G1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("I1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };
  sheet.getCell("J1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FCE5CD" },
  };

  sheet.getCell("F1").font = { color: { argb: "000000"}, size:9 };
  sheet.getCell("F1").value = " اسطر الحفظ";
  sheet.getCell("F1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D9D9D9" },
  };

  sheet.getCell("H1").font = { color: { argb: "000000" }, size:9};
  sheet.getCell("H1").value = "اسطر المراجعة";
  sheet.getCell("H1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D9D9D9" },
  };

  // row 2 style
  sheet.getRow(2).height = 20;
  for (let i = 65; i < 75; i++) {
    sheet.getCell(String.fromCharCode(i) + "2").font = {
      size: 8,
      color: { argb: "FFFFFF" },
    };
    sheet.getCell(String.fromCharCode(i) + "2").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "A61C00" },
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
  sheet.getCell("A2").value = "الواجب";
  sheet.getCell("B2").value = "التلقين";
  sheet.getCell("C2").value = "الحفظ من";
  sheet.getCell("D2").value = "الحفظ الى";
  sheet.getCell("E2").value = "الدرجة";
  sheet.getCell("F2").value = "المراجعة من";
  sheet.getCell("G2").value = "المراجعة الى";
  sheet.getCell("H2").value = "الدرجة";
  sheet.getCell("I2").value = "التقييم";
  sheet.getCell("J2").value = "تاريخ الانجاز";

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
      for (let j = 65; j < 75; j++) {
        if (j == 67) {
          //sheet.mergeCells("C" + i + ":H" + i);
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
          sheet.getCell("D" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("D" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("E" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("E" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("F" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("F" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("G" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("G" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("H" + i).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
          sheet.getCell("H" + i).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          sheet.getCell("E" + i).value = msg;
          sheet.getCell("E" + i).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
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
    for (let j = 65; j < 75; j++) {
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
      } else if (j == 69 || j == 72) {
        sheet.getCell(String.fromCharCode(j) + i).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
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

function creatTasksForSaving(
  sheet,
  qArray,
  souraOfSavingIndex,
  amountOfSaving,
  typeOfSaving
) {
  let wantedTest = "";
  let countarOfAya = 0;
  if (souraOfSavingIndex == 1) {
    countarOfAya = 5;
  }
  let endOfTask = qArray[souraOfSavingIndex][countarOfAya].line_start;
  let pageOFEndOFtask = qArray[souraOfSavingIndex][countarOfAya].page;
  let lastTaskEndLine = null;
  let lastTaskEndPage = null;
  for (let i = 3; i < 46; i++) {
    if (
      i == 13 ||
      i == 24 ||
      i == 35 ||
      sheet.getCell("C" + i).value != "---"
    ) {
      continue;
    }
    if (amountOfSaving % 15 == 0) {
      endOfTask += amountOfSaving;
      while (endOfTask > 15) {
        endOfTask = endOfTask - 15;
        pageOFEndOFtask++;
      }
      if (endOfTask < 5) {
        endOfTask = 15;
        pageOFEndOFtask--;
      } else if (endOfTask > 11) {
        endOfTask = 15;
      }
    } else if (amountOfSaving == 7 || amountOfSaving % 15 == 7) {
      let temp = amountOfSaving - 7;
      while (temp != 0) {
        temp = temp - 15;
        pageOFEndOFtask++;
      }
      if (endOfTask < 6) {
        endOfTask = 8;
      } else if (endOfTask < 12) {
        endOfTask = 15;
      } else if (endOfTask < 16) {
        endOfTask = 8;
        pageOFEndOFtask++;
      }
    } else {
      endOfTask += amountOfSaving;
      while (endOfTask > 15) {
        endOfTask = endOfTask - 15;
        pageOFEndOFtask++;
      }
    }
    while (true) {
      if (qArray[souraOfSavingIndex].length - 1 == countarOfAya) {
        let addIt = false;
        let remainingLines;
        if (lastTaskEndPage != null) {
          let lastTaskPercentage = 0.3 * amountOfSaving;

          if (
            lastTaskEndPage == qArray[souraOfSavingIndex][countarOfAya].page
          ) {
            remainingLines =
              qArray[souraOfSavingIndex][countarOfAya].line_end -
              lastTaskEndLine;
            if (remainingLines <= lastTaskPercentage && remainingLines >= 0) {
              addIt = true;
            }
          } else {
            remainingLines = 15 - lastTaskEndLine;
            remainingLines += qArray[souraOfSavingIndex][countarOfAya].line_end;
            remainingLines +=
              (qArray[souraOfSavingIndex][countarOfAya].page -
                lastTaskEndPage -
                1) *
              15;
            if (remainingLines <= lastTaskPercentage && remainingLines >= 0) {
              addIt = true;
            }
          }
        }
        if (addIt) {
          i--;
          if (i == 13 || i == 24 || i == 35) {
            i--;
          }
          //wanted test calc
          if (
            souraOfSavingIndex == 77 ||
            souraOfSavingIndex == 66 ||
            souraOfSavingIndex == 57 ||
            souraOfSavingIndex == 45 ||
            souraOfSavingIndex == 35 ||
            souraOfSavingIndex == 29 ||
            souraOfSavingIndex == 22 ||
            souraOfSavingIndex == 17 ||
            souraOfSavingIndex == 8 ||
            souraOfSavingIndex == 4 ||
            souraOfSavingIndex == 1
          ) {
            wantedTest = 31 - qArray[souraOfSavingIndex][0].jozz;
          }
          sheet.getCell("B1").value = wantedTest;

          sheet.getCell("C" + i).value =
            qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
          sheet.getCell("D" + i).value = "الخ";
          let count = 1;
          let j = i;
          while (count < 4) {
            if (j >= 45 || j + count > 45) {
              break;
            }
            if (sheet.getCell("C" + (j + count)).value != "---") {
              if (j + count == 13 || j + count == 24 || j + count == 35) {
                j++;
                continue;
              }
              sheet.getCell("D" + (j + count)).value =
                qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar +
                " الخ";
              count++;
            } else {
              sheet.getCell("C" + (j + count)).value =
                qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar +
                " 1";
              sheet.getCell("D" + (j + count)).value = "الخ";
              count++;
            }
          }
        } else {
          sheet.getCell("C" + i).value =
            qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
          sheet.getCell("D" + i).value = "الخ";
          let count = 1;
          let j = i;

          //wanted test calc
          if (
            souraOfSavingIndex == 77 ||
            souraOfSavingIndex == 66 ||
            souraOfSavingIndex == 57 ||
            souraOfSavingIndex == 45 ||
            souraOfSavingIndex == 35 ||
            souraOfSavingIndex == 29 ||
            souraOfSavingIndex == 22 ||
            souraOfSavingIndex == 17 ||
            souraOfSavingIndex == 8 ||
            souraOfSavingIndex == 4 ||
            souraOfSavingIndex == 1
          ) {
            wantedTest = 31 - qArray[souraOfSavingIndex][0].jozz;
          }
          sheet.getCell("B1").value = wantedTest;

          while (count < 4) {
            if (j >= 45 || j + count > 45) {
              break;
            }
            if (sheet.getCell("C" + (j + count)).value != "---") {
              if (j + count == 13 || j + count == 24 || j + count == 35) {
                j++;
                continue;
              }
              sheet.getCell("D" + (j + count)).value =
                qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar +
                " الخ";
              count++;
            } else {
              sheet.getCell("C" + (j + count)).value =
                qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar +
                " 1";
              sheet.getCell("D" + (j + count)).value = "الخ";
              count++;
            }
          }
        }

        if (typeOfSaving == 0) {
          souraOfSavingIndex--;
        } else {
          souraOfSavingIndex++;
        }
        if (souraOfSavingIndex > 113 || souraOfSavingIndex < 1) break;
        countarOfAya = 0;
        endOfTask = qArray[souraOfSavingIndex][countarOfAya].line_start;
        pageOFEndOFtask = qArray[souraOfSavingIndex][countarOfAya].page;
        lastTaskEndLine = null;
        lastTaskEndPage = null;
        break;
      }
      if (
        pageOFEndOFtask == qArray[souraOfSavingIndex][countarOfAya].page &&
        qArray[souraOfSavingIndex][countarOfAya].line_end >= endOfTask
      ) {
        if (countarOfAya == 0) {
          sheet.getCell("C" + i).value =
            qArray[souraOfSavingIndex][countarOfAya].sura_name_ar + " 1";
          sheet.getCell("D" + i).value =
            qArray[souraOfSavingIndex][countarOfAya].aya_no;
          lastTaskEndLine = qArray[souraOfSavingIndex][countarOfAya].line_end;
          lastTaskEndPage = qArray[souraOfSavingIndex][countarOfAya].page;
        } else {
          if (endOfTask == 15) {
            let temp = countarOfAya;
            while (qArray[souraOfSavingIndex][temp].line_start != 1) {
              temp++;
              if (qArray[souraOfSavingIndex].length <= temp) break;
            }
            sheet.getCell("C" + i).value =
              qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
            sheet.getCell("D" + i).value =
              qArray[souraOfSavingIndex][--temp].aya_no;
          } else {
            sheet.getCell("C" + i).value =
              qArray[souraOfSavingIndex][countarOfAya - 1].sura_name_ar + " 1";
            sheet.getCell("D" + i).value =
              qArray[souraOfSavingIndex][countarOfAya].aya_no;
          }
          lastTaskEndLine =
            qArray[souraOfSavingIndex][countarOfAya - 1].line_end;
          lastTaskEndPage = qArray[souraOfSavingIndex][countarOfAya - 1].page;
        }
        break;
      }

      countarOfAya++;
    }
    if (souraOfSavingIndex > 113) {
      sheet.getCell("G" + i).value = "النَّاس 1";
      sheet.getCell("H" + i).value = "النَّاس الخ";
      break;
    }
    if (souraOfSavingIndex < 1) {
      sheet.getCell("G" + i).value = "البَقَرَة 1";
      sheet.getCell("H" + i).value = "البَقَرَة الخ";
      break;
    }
  }
}

function creatTasksForRevision(
  sheet,
  qArray,
  souraOfRevisionIndex,
  amountOfRevision,
  typeOfRevision,
  startOfRevision
) {
  if (typeOfRevision == "1") {
    creatTasksForRevisionBySoura(
      sheet,
      qArray,
      souraOfRevisionIndex,
      amountOfRevision,
      startOfRevision,
      typeOfRevision
    );
  } else {
    creatTasksForRevisionByLine(
      sheet,
      qArray,
      souraOfRevisionIndex,
      amountOfRevision,
      startOfRevision
    );
  }
}

function creatTasksForRevisionByLine(
  sheet,
  qArray,
  souraOfRevisionIndex,
  amountOfRevision,
  startOfRevision
) {
  let countarOfAya = 0;
  if (souraOfRevisionIndex == 1) {
    countarOfAya = 5;
  }
  let endOfTask = qArray[souraOfRevisionIndex][countarOfAya].line_start;
  let pageOFEndOFtask = qArray[souraOfRevisionIndex][countarOfAya].page;
  let startOfNextTask = "";
  let lastTaskEndLine = null;
  let lastTaskEndPage = null;
  sheet.getCell("F" + 3).value =
    qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " 1";

  for (let i = 3; i < 46; i++) {
    if (i == 13 || i == 24 || i == 35) {
      continue;
    }

    if (amountOfRevision % 15 == 0) {
      endOfTask += amountOfRevision;
      while (endOfTask > 15) {
        endOfTask = endOfTask - 15;
        pageOFEndOFtask++;
      }
      if (endOfTask < 5) {
        endOfTask = 15;
        pageOFEndOFtask--;
      } else if (endOfTask > 11) {
        endOfTask = 15;
      }
    } else if (amountOfRevision == 7 || amountOfRevision % 15 == 7) {
      let temp = amountOfRevision - 7;
      while (temp != 0) {
        temp = temp - 15;
        pageOFEndOFtask++;
      }
      if (endOfTask < 6) {
        endOfTask = 8;
      } else if (endOfTask < 12) {
        endOfTask = 15;
      } else if (endOfTask < 16) {
        endOfTask = 8;
        pageOFEndOFtask++;
      }
    } else {
      endOfTask += amountOfRevision;
      while (endOfTask > 15) {
      endOfTask = endOfTask - 15;
      pageOFEndOFtask++;
      }
    }


    while (true) {
      if (
        pageOFEndOFtask == qArray[souraOfRevisionIndex][countarOfAya].page &&
        qArray[souraOfRevisionIndex][countarOfAya].line_end >= endOfTask
      ) {
        if (endOfTask == 15) {
          let temp = countarOfAya;
          while (qArray[souraOfRevisionIndex][temp].line_start != 1) {
            temp++;
            if (qArray[souraOfRevisionIndex].length <= temp) break;
          }
          countarOfAya = temp -1;
        }
        sheet.getCell("G" + i).value =
          qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar +
          " " +
          qArray[souraOfRevisionIndex][countarOfAya].aya_no;
        if (i != 3) {
          sheet.getCell("F" + i).value = startOfNextTask;
        }
        //startOfNextTask = sheet.getCell("H" + i).value;
        startOfNextTask =
          qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " " + 1;
        lastTaskEndLine = qArray[souraOfRevisionIndex][countarOfAya].line_end;
        lastTaskEndPage = qArray[souraOfRevisionIndex][countarOfAya].page;
        break;
      }
      if (qArray[souraOfRevisionIndex].length - 1 == countarOfAya) {
        let addIt = false;
        let remainingLines;
        if (lastTaskEndPage != null) {
          let lastTaskPercentage = 0.3 * amountOfRevision;

          if (
            lastTaskEndPage == qArray[souraOfRevisionIndex][countarOfAya].page
          ) {
            remainingLines =
              qArray[souraOfRevisionIndex][countarOfAya].line_end -
              lastTaskEndLine;
            if (remainingLines <= lastTaskPercentage && remainingLines >= 0) {
              addIt = true;
            }
          } else {
            remainingLines = 15 - lastTaskEndLine;
            remainingLines +=
              qArray[souraOfRevisionIndex][countarOfAya].line_end;
            remainingLines +=
              (qArray[souraOfRevisionIndex][countarOfAya].page -
                lastTaskEndPage -
                1) *
              15;
            if (remainingLines <= lastTaskPercentage && remainingLines >= 0) {
              addIt = true;
            }
          }
        }

        let stopAtEnd = false;
        let additionLines = 0;
        let percentage = 0.3 * amountOfRevision;

        if (
          pageOFEndOFtask == qArray[souraOfRevisionIndex][countarOfAya].page
        ) {
          additionLines =
            endOfTask - qArray[souraOfRevisionIndex][countarOfAya].line_end;
          if (additionLines <= percentage && additionLines >= 0) {
            stopAtEnd = true;
          }
        } else {
          additionLines =
            15 - qArray[souraOfRevisionIndex][countarOfAya].line_end;
          additionLines += endOfTask;
          additionLines +=
            (pageOFEndOFtask -
              qArray[souraOfRevisionIndex][countarOfAya].page -
              1) *
            15;

          if (additionLines <= percentage && additionLines >= 0) {
            stopAtEnd = true;
          }
        }

        if (stopAtEnd || addIt) {
          if (stopAtEnd) {
            sheet.getCell("G" + i).value =
              qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " الخ";
            if (i != 3) {
              sheet.getCell("F" + i).value = startOfNextTask;
            }
          } else if (addIt) {
            i--;
            if (i == 13 || i == 24 || i == 35) {
              i--;
            }
            sheet.getCell("G" + i).value =
              qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " الخ";
          }
          if (startOfRevision == 0) {
            souraOfRevisionIndex++;
          } else {
            souraOfRevisionIndex--;
          }
          if (souraOfRevisionIndex > 113 || souraOfRevisionIndex < 1) break;

          countarOfAya = 0;
          endOfTask = qArray[souraOfRevisionIndex][countarOfAya].line_start;
          pageOFEndOFtask = qArray[souraOfRevisionIndex][countarOfAya].page;
          lastTaskEndLine = null;
          lastTaskEndPage = null;
          startOfNextTask =
            qArray[souraOfRevisionIndex][countarOfAya].sura_name_ar + " " + 1;
          break;
        } else {
          if (startOfRevision == 0) {
            souraOfRevisionIndex++;
          } else {
            souraOfRevisionIndex--;
          }
          if (souraOfRevisionIndex > 113 || souraOfRevisionIndex < 1) break;
          countarOfAya = 0;
          endOfTask = qArray[souraOfRevisionIndex][countarOfAya].line_start + additionLines - 3;
          pageOFEndOFtask = qArray[souraOfRevisionIndex][countarOfAya].page;
          
          while (endOfTask > 15) {
            endOfTask = endOfTask - 15;
            pageOFEndOFtask++;
          }
          lastTaskEndLine = null;
          lastTaskEndPage = null;
        }
      }

      countarOfAya++;
    }
    if (souraOfRevisionIndex > 113) {
      sheet.getCell("F" + i).value = startOfNextTask;
      sheet.getCell("G" + i).value = "النَّاس الخ";
      break;
    }
    if (souraOfRevisionIndex < 1) {
      sheet.getCell("F" + i).value = startOfNextTask;
      sheet.getCell("G" + i).value = "البَقَرَة الخ";
      break;
    }
  }
}

function creatTasksForRevisionBySoura(
  sheet,
  qArray,
  souraOfRevisionIndex,
  amountOfRevision,
  startOfRevision,
  typeOfRevision
) {
  for (let i = 3; i < 46; i++) {
    if (souraOfRevisionIndex > 113 || souraOfRevisionIndex < 1) {
      break;
    }
    if (i == 13 || i == 24 || i == 35) {
      continue;
    }
    if (amountOfRevision == 1) {
      sheet.getCell("F" + i).value =
        qArray[souraOfRevisionIndex][0].sura_name_ar + " 1";
      sheet.getCell("G" + i).value = "الخ";
      if (startOfRevision == 0) {
        souraOfRevisionIndex++;
      } else {
        souraOfRevisionIndex--;
      }
    } else {
      sheet.getCell("F" + i).value =
        qArray[souraOfRevisionIndex][0].sura_name_ar + " 1";

      if (startOfRevision == 0) {
        souraOfRevisionIndex += amountOfRevision;
        if (souraOfRevisionIndex >= 113) {
          souraOfRevisionIndex = 114;
        }
        sheet.getCell("G" + i).value =
          qArray[souraOfRevisionIndex - 1][0].sura_name_ar + " الخ";
      } else {
        souraOfRevisionIndex -= amountOfRevision;
        if (souraOfRevisionIndex <= 1) {
          souraOfRevisionIndex = 0;
        }
        sheet.getCell("G" + i).value =
          qArray[souraOfRevisionIndex + 1][0].sura_name_ar + " الخ";
      }
    }
  }
}

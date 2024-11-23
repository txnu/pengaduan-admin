import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";
import { Report } from "../../../../providers/data_interface";
import { base64 } from "../../../../components/base64/base64";

export const generateDocx = (report: Report) => {
  const doc = new Document({
    sections: [
      {
        children: [
          // Header Section
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "POLRI DAERAH KALIMANTAN BARAT",
                            bold: true,
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "RESORT SAMBAS",
                            bold: true,
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "SEKTOR GALING",
                            bold: true,
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "Jl. Ratu Sepudak-Galing",
                            size: 22,
                            font: "Arial",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                        spacing: { after: 100 },
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                    children: [],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new ImageRun({
                data: base64,
                transformation: {
                  width: 80,
                  height: 65,
                },
                type: "png",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "SURAT TANDA BUKTI LAPOR",
                bold: true,
                size: 28,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "KEHILANGAN SURAT-SURAT / BARANG-BARANG",
                bold: true,
                underline: { type: UnderlineType.SINGLE },
                size: 28,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: `Nomor : ${report.nomorLaporan}`,
                size: 24,
                bold: true,
                font: "Arial",
              }),
            ],
          }),

          // Intro Paragraph
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "\tYang bertanda tangan di bawah ini menerangkan bahwa pada hari Kamis tanggal 28 Juli 2016 sekitar jam: 15.00 WIB telah datang seorang laki-laki / perempuan bangsa Indonesia / asing yang mengaku bernama:",
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Details Section
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `\tNama\t\t\t: ${report.idUser.namalengkap}`,
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `\tTempat Tgl/Lahir\t: ${
                  report.idUser?.tanggal_lahir || "Tanggal lahir tidak tersedia"
                }`,
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: "\tAgama\t\t: Islam",
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `\tPekerjaan\t\t: ${report.idUser.pekerjaan}`,
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: "\tKebangsaan\t\t: Indonesia",
                size: 24,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `\tAlamat\t\t: ${report.idUser.alamat}`,
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Lost Item Declaration
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: "MELAPORKAN BAHWA TELAH KEHILANGAN SURAT-SURAT / BARANG BERUPA :",
                bold: true,
                underline: { type: UnderlineType.SINGLE },
                size: 22,
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "\n\t1 (satu) buah KTM / ATM dari UPI an. Pelapor.",
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Incident Description
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `\t${report.kronologi}`,
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Note about Validity
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "\tSurat Tanda Laporan Kehilangan ini bukan sebagai pengganti barang / surat yang hilang dan hanya untuk pengurusan / penerbitan surat surat yang baru, berlaku selama 14 (empat belas) hari.",
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Legal Warning
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: "Catatan : \t“Barang siapa dengan sengaja memberikan keterangan palsu, maka diancam dengan hukuman penjara selama lamanya 7 (tujuh) tahun, karena melanggar pasal 242 ayat (1) KUH Pidana”.",
                italics: true,
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),

          // Final Statement
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "\tDemikian Surat Tanda Bukti Laporan Kehilangan ini dibuat dengan yang sebenar benarnya untuk dapat digunakan sementara sebagaimana mestinya dan atau untuk mengurus kembali barang / surat – surat yang hilang untuk dapat dipergunakan sampai batas waktu yang tercantum pada tanggal tersebut di atas.",
                size: 24,
                font: "Arial",
              }),
            ],
          }),

          // Signature Section
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                    children: [
                      new Paragraph({ children: [] }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 990 },
                        children: [
                          new TextRun({
                            text: "\nTanda tangan pelapor",
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${report.idUser.namalengkap}`,
                            bold: true,
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "Galing, 28 Juli 2016",
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 990 },
                        children: [
                          new TextRun({
                            text: "BA SPKT II",
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,

                        children: [
                          new TextRun({
                            text: `NANANG`,

                            bold: true,
                            size: 24,
                            font: "Arial",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `AIPDA NRP 12345678`,
                            bold: true,
                            size: 24,
                            font: "Arial",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Pack the document and trigger download
  Packer.toBlob(doc).then((blob) => {
    saveAs(
      blob,
      `${report.idJenisPengaduan.jenis}_${report.idUser.namalengkap}.docx`
    );
  });
};

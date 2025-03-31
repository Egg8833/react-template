import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const initialProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: `臺股期貨 ${2500 + i}.TXF`,
}));

const TradeTable: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleChangeName = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, name: "台股指數股票" } : product
      )
    );
  };

  // ✅ **提取 TableCell 樣式變數**
  const tableCellStyle = { border: "1px solid black", padding: "8px", textAlign: "center" };

  // ✅ **提取 Button 樣式變數**
  const buttonStyle = { minWidth: "50px" };

  // ✅ **抽取出 買/賣 按鈕組件**
  const TradeButtons = ({ productId }: { productId: number }) => (
    <>
      <Button
        variant="outlined"
        color="error"
        sx={{ ...buttonStyle, borderColor: "red", color: "red" }}
        onClick={() => handleChangeName(productId)}
      >
        買
      </Button>
      <Button
        variant="outlined"
        color="success"
        sx={{ ...buttonStyle, borderColor: "green", color: "green", marginLeft: 1 }}
        onClick={() => handleChangeName(productId)}
      >
        賣
      </Button>
    </>
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 400,
        overflowY: "auto",
        border: "1px solid black",
        scrollSnapType: "y mandatory",
        scrollPaddingTop: "42px",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {["商品一", "商品", "商品二"].map((header, index) => (
              <TableCell key={index} sx={{ width: index === 1 ? "300px" : "150px", ...tableCellStyle }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} sx={{ height: 48, scrollSnapAlign: "start" }}>
              {/* 買賣按鈕 - 左側 */}
              <TableCell sx={{ width: "150px", ...tableCellStyle }}>
                <TradeButtons productId={product.id} />
              </TableCell>

              {/* 商品名稱 */}
              <TableCell sx={{ width: "300px", ...tableCellStyle }}>{product.name}</TableCell>

              {/* 買賣按鈕 - 右側 */}
              <TableCell sx={{ width: "150px", ...tableCellStyle }}>
                <TradeButtons productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradeTable;

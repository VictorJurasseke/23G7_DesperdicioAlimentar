import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableRankTR = ({ usernome, user_periodo, pontos_usuario, rank_usuario, turma }) => {
  return (
    <tr>
      <td className="text-center">
        <span style={{ marginRight: "10px", fontWeight: "bold", color:"#ffffff" }}>{rank_usuario}.</span>
        {usernome}
        {usernome !== "-" && <span style={{ marginLeft: "5px", fontStyle: "italic" }}>({turma})</span>}
      </td>
      <td>{pontos_usuario}</td>
    </tr>
  );
};

export default TableRankTR;

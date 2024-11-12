import { useState, useRef } from "react";
import { findAll, deleteById, insert } from "./ContatosApi";

export function ContatosView() {
  const [contatos, setContatos] = useState([]);

  const inputTipo = useRef();
  const inputNome = useRef();
  const inputTelefone = useRef();

  const salvar = async () => {
    console.log(
      "Salvando contato...",
      inputTipo.current.value,
      inputNome.current.value,
      inputTelefone.current.value,
    );

    await insert(
      inputTipo.current.value,
      inputNome.current.value,
      inputTelefone.current.value,
    );

    alert("Contato salvo com sucesso!");

    inputTipo.current.value = "Filho(a)";
    inputNome.current.value = "";
    inputTelefone.current.value = "";

    inputTipo.current.focus();

    await pesquisar();
  };

  const pesquisar = async () => {
    console.log("Consultando contatos...");
    const dados = await findAll();
    setContatos(dados);
  };

  const excluir = async (id) => {
    console.log("Excluindo contato...", id);
    await deleteById(id);
    alert("Contato excluído com sucesso!");
    pesquisar();
  };

  return (
    <main>
      <h1>Listagem de contatos</h1>

      <label>Tipo:</label>
      <select ref={inputTipo}>
        <option>Filho(a)</option>
        <option>Neto(a)</option>
        <option>Amigo(a)</option>
      </select>

      <label>Nome:</label>
      <input type="text" ref={inputNome} />

      <label>Telefone:</label>
      <input type="tel" ref={inputTelefone} />

      <button onClick={salvar}>SALVAR</button>
      <button onClick={pesquisar}>CONSULTAR</button>

      <table>
        <tr>
          <th>TIPO</th>
          <th>NOME</th>
          <th>TEL</th>
          <th></th>
        </tr>

        {contatos.map((c) => (
          <tr>
            <td>{c.tipo}</td>
            <td>{c.nome}</td>
            <td>{c.telefone}</td>
            <td>
              <button onClick={() => excluir(c.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    </main>
  );
}

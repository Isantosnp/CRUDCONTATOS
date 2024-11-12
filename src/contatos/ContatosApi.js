const URL =
  "https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos";

export async function findAll() {
  console.log("Executando findAll()");

  const requestInfo = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 112233",
    },
  };

  const responseHttp = await fetch(URL, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("Falha ao tentar buscar os contatos.");
    throw new Error("Falha ao tentar buscar os contatos.");
  }
}

export async function deleteById(id) {
  console.log(`Executando deleteById(${id})`);

  const requestInfo = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 112233",
    },
  };

  const responseHttp = await fetch(URL + "/" + id, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("Falha ao tentar excluir os contatos.");
    throw new Error("Falha ao tentar excluir os contatos.");
  }
}

export async function insert(tipo, nome, telefone) {
  console.log(`Executando insert(${tipo}, ${nome}, ${telefone})`);

  const requestInfo = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 112233",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipo, nome, telefone }),
  };

  const responseHttp = await fetch(URL, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else if (responseHttp.status === 400) {
    const error = await responseHttp.json();
    console.log(error);
    throw new Error(JSON.stringify(error));
  } else {
    console.log("Falha ao tentar inserir os contatos.");
    throw new Error("Falha ao tentar inserir os contatos.");
  }
}

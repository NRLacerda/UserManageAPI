function erro(err) {
	console.log(
		{
			codigo: 404,
			status: "erro",
			mensagem: "Erro",
		},
		err
	);
}
function authorized(data) {
	console.log(
		{
			codigo: 200,
			status: "Permitido",
			mensagem: "Usuário autorizado.",
		},
		data
	);
}
function sucess(row) {
	console.log(
		{
			codigo: 200,
			status: "Sucesso",
			mensagem: "Requisição bem sucedida.",
		},
		row
	);
}

// Exporta as funções
export {sucess,erro,authorized}
module.exports = function formatarData(dataString) {
  // Converte a string em um objeto de data
  let data = new Date(dataString);

  // Obtem os componentes individuais da data
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // Os meses começam do zero, então é necessário adicionar 1
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minutos = data.getMinutes();
  let segundos = data.getSeconds();

  // Formata a data no formato desejado (DD/MM/AAAA HH:MM:SS)
  let dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;

  return dataFormatada;
}

function getData() {
    var today = new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" });
    var partes = today.split(" ");
    today = (partes[0].split("-")[1] + "/" + partes[0].split("-")[2] + "/" + partes[0].split("-")[0]) + ", " + today.split(" ")[1]
    return today;
}
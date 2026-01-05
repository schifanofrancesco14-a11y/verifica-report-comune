async function verifica() {
  const protInput = document.getElementById("protocollo");
  const output = document.getElementById("output");
  const protocollo = protInput.value.trim();

  if (!protocollo) {
    output.textContent = "Inserisci un protocollo";
    return;
  }

  const response = await fetch("registro_protocollo.csv");
  const text = await response.text();

  const righe = text.split("\n").slice(1);
  const trovate = righe
    .map(r => r.split(","))
    .filter(c => c[0] === protocollo);

  if (trovate.length === 0) {
    output.textContent = "❌ Documento NON presente nel registro";
    return;
  }

  const ultima = trovate[trovate.length - 1];

  output.textContent = `
✔ DOCUMENTO PRESENTE

Protocollo: ${ultima[0]}
Data: ${ultima[1]}
ODS: ${ultima[2]}
Tecnico: ${ultima[3]}
File: ${ultima[4]}
Stato: ${ultima[7]}

Hash originale:
${ultima[5]}

Hash riga:
${ultima[9]}
`;
}

// auto-compilazione da QR
const params = new URLSearchParams(window.location.search);
const prot = params.get("prot");
if (prot) {
  document.getElementById("protocollo").value = prot;
  verifica();
}

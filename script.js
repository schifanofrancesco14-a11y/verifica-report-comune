function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result.map(v => v.replaceAll('"', ''));
}

async function verifica() {
  const protocollo = document.getElementById("protocollo").value.trim();
  const hash = document.getElementById("hash")?.value.trim();
  const output = document.getElementById("esito");

  output.innerHTML = '';

  if (!protocollo) {
    output.innerHTML = "⚠️ Inserisci il protocollo";
    return;
  }

  let response;
  try {
    response = await fetch("registro_protocollo.csv");
  } catch {
    output.innerHTML = "❌ Impossibile caricare il registro";
    return;
  }

  if (!response.ok) {
    output.innerHTML = "❌ Errore nel caricamento del registro";
    return;
  }

  const text = await response.text();
  const righe = text.split('\n').slice(1);

  for (const r of righe) {
    if (!r.trim()) continue;

    const c = parseCsvLine(r);

    const p = c[0];
    const hashOrig = c[5];
    const hashFirm = c[6];
    const stato = c[7];

    if (p === protocollo && (!hash || hash === hashOrig || hash === hashFirm)) {
      output.innerHTML = `
        <p class="ok">✔ Documento valido</p>
        <pre>
Protocollo: ${p}
Stato: ${stato}
Hash verificato: ${hash || '(non richiesto)'}
        </pre>
      `;
      return;
    }
  }

  output.innerHTML = "❌ Documento NON presente nel registro";
}

// auto-compilazione da QR
const params = new URLSearchParams(window.location.search);
const prot = params.get("protocollo");
const hash = params.get("hash");

if (prot) {
  document.getElementById("protocollo").value = prot;
}
if (hash && document.getElementById("hash")) {
  document.getElementById("hash").value = hash;
}
if (prot) {
  verifica();
}

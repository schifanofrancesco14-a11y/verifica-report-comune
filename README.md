# Portale di Verifica Documenti Protocollati – Comune

Questo repository contiene il **portale pubblico di verifica** dei documenti informatici protocollati generati dall’applicazione *Report Comune*.

Il portale consente a **chiunque** (cittadini, imprese, enti terzi) di verificare l’autenticità di un documento tramite **protocollo** e **hash SHA256**, senza accesso a sistemi interni.

---

## 🎯 Finalità

Il sistema è progettato per:

* garantire **trasparenza amministrativa**
* permettere la **verifica pubblica** dei documenti
* dimostrare l’**integrità** del documento nel tempo
* supportare audit e controlli

Il portale **non modifica** alcun dato e non consente inserimenti o cancellazioni.

---

## 🗂 Struttura del repository

```
/verifica-report-comune
│
├── index.html                 # Pagina principale di verifica
├── script.js                  # Logica di verifica (JS puro)
├── style.css                  # Stile grafico
├── registro_protocollo.csv    # Registro pubblico (sola lettura)
└── README.md                  # Questo file
```

> ⚠️ L’ordine dei file **non è rilevante** per GitHub Pages. È importante solo che i nomi coincidano con quelli richiamati da `index.html`.

---

## 🔍 Come funziona la verifica

1. L’utente apre la pagina `index.html`
2. Inserisce:

   * **Protocollo** (es. `PROT-2026-000012`)
   * **Hash SHA256** (originale o firmato)
3. Il sistema:

   * carica `registro_protocollo.csv`
   * analizza le righe
   * confronta protocollo + hash

### Esiti possibili

* ✅ **Documento valido** → presente e coerente
* ❌ **Documento non presente** → non trovato
* ⚠️ **Dati incompleti** → protocollo mancante

---

## 🔐 Sicurezza e integrità

Il registro utilizza:

* **Hash SHA256** del PDF
* **Hash concatenato di riga**
* **Hash della riga precedente**

Questo crea una **catena immutabile** che rende evidenti eventuali manomissioni.

Il file CSV è pubblicato in **sola lettura**.

---

## 🔗 Verifica tramite QR Code

I PDF generati dall’applicazione includono un **QR Code** contenente:

```
protocollo=PROT-XXXX
hash=SHA256...
```

Aprendo il link, il portale:

* compila automaticamente i campi
* avvia la verifica

---

## 🌐 Pubblicazione

Il portale è pensato per essere pubblicato tramite **GitHub Pages**:

* nessun backend
* nessun database
* nessuna dipendenza esterna

Compatibile con qualsiasi browser moderno.

---

## 🏛 Contesto normativo

Il sistema è coerente con:

* CAD – Codice dell’Amministrazione Digitale
* Linee guida AgID sul documento informatico
* Principi di trasparenza amministrativa

Non sostituisce la firma digitale qualificata, ma ne **supporta la verifica**.

---

## 🚧 Sviluppi futuri (roadmap)

* 🔐 Autenticazione utenti interni
* 📊 Dashboard amministrativa
* 🖊 Firma digitale PAdES
* 📍 Geolocalizzazione interventi
* 🗺 Mappa GPS (facoltativa)

---

## ℹ️ Note finali

Questo repository rappresenta la **parte pubblica** del progetto.

L’applicazione interna (Flutter) genera:

* PDF
* registro CSV
* QR Code di verifica

Il portale consente la verifica **indipendente e autonoma**.

---

© Comune – Progetto dimostrativo a fini tecnici e amministrativi
# verifica-report-comune

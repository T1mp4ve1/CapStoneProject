# 🎸 Chitart – Custom Guitar Shop (Full Stack Project)

<p align="center">
  <img src="./readmeImg/homepage.png" width="800">
</p>

<p align="center">
  🛜 <a href="https://proud-coast-0fc73eb03.1.azurestaticapps.net/">Visita il sito online</a> 🛜
</p>

> ⚠️ *Al primo avvio potrebbe comparire un errore 500: Azure impiega ~30 secondi per “risvegliare” l’app.*

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/2gi5k.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

---

## 🚀 Panoramica

**Chitart** è un sito e-commerce dedicato alla vendita e configurazione di chitarre artigianali.  
Il progetto è diviso in **4 sezioni principali**:

- 🎸 **Catalogo**: visualizzazione completa di tutti i modelli disponibili  
- 🛠️ **Custom Shop**: configuratore per creare la propria chitarra personalizzata  
- 🧑‍💼 **Area Amministrativa**: gestione di prodotti, ordini, utenti e contenuti  
- ⚙️ **Funzionalità aggiuntive**: filtri, sorting, notifiche real-time, UX migliorata  

---

## 💪 Tecnologie utilizzate

### **Backend**
- C#
- ASP.NET Core
- SQL Server
- Entity Framework Core
- API REST
- Identity
- JWT Authentication
- Swagger
- SignalR

### **Frontend**
- JavaScript
- Bootstrap
- React
- React Context

---

# 🚴 Sezioni principali

## 1) Catalogo prodotti

> *Possibilità di filtrare le chitarre in base al tipo di corpo.*

<p align="center">
  <img src="./readmeImg/1_catalogpage.gif" width="800">
</p>

### 🔍 Pagina dettagli

<p align="center">
  <img src="./readmeImg/1_details.png" width="800">
</p>

---

## 2) Custom Shop

> *L'utente può scegliere il tipo di corpo.*

<p align="center">
  <img src="./readmeImg/2_body.gif" width="800">
</p>

> *Il materiale del corpo.*

<p align="center">
  <img src="./readmeImg/2_material.gif" width="800">
</p>

> *E il colore.*

<p align="center">
  <img src="./readmeImg/2_colors.gif" width="800">
</p>

---

## 3) Pagina Carrello

> *L’utente può gestire il contenuto del carrello prima di procedere al checkout.*

<p align="center">
  <img src="./readmeImg/3_cartpage.gif" width="800">
</p>

---

## 4) Gestione Account

### Pannello utente

> *Il pannello mostra il contatore del carrello, le notifiche e le opzioni del profilo.*

<p align="center">
  <img src="./readmeImg/4_userpanel.gif" width="200">
</p>

> *Dropdown con le opzioni.*

<p align="center">
  <img src="./readmeImg/4_dropdown.gif" width="200">
</p>

---

### Cronologia ordini

> *La pagina permette all’utente di vedere la cronologia degli ordini effettuati.*

<p align="center">
  <img src="./readmeImg/4_ordercron.png" width="800">
</p>

---

### Supporto

> *Pagina dedicata al supporto utenti, dove possono aprire un ticket, vedere lo stato, le risposte e i dettagli relativi a ogni richiesta.*

<p align="center">
  <img src="./readmeImg/4_support.gif" width="800">
</p>

---

### Profile Settings

> *L’utente può modificare il proprio profilo e cambiare ruolo (con limitazioni) per accedere all’area amministrativa.*

<p align="center">
  <img src="./readmeImg/4_role.gif" width="800">
</p>

## 5) Area amministrativa
> Per accedere all’area amministrativa è necessario cliccare sull’icona dell’ingranaggio rosso, situata a destra del “Pannello Utente”.

> ⚠️ *È necessario avere almeno il ruolo “Operator” (modificabile nelle impostazioni del profilo).*
<p align="center">
  <img src="./readmeImg/5_open.png" width="200">
</p>

---

### Gestione Utenti

> *In questa pagina è possibile effettuare ricerche, visualizzare la lista degli utenti e gestirli modificando i loro dati (incluso il ruolo).*
<p align="center">
  <img src="./readmeImg/5_users.png" width="800">
</p>

---

### Gestione Artisti e Chitarre

> *Il CRUD completo e visualizzazione dei dati trammite tabelle.*
<p align="center">
  <img src="./readmeImg/5_entity.gif" width="800">
</p>

---

### Gestione Ordini

> *Visualizzazione, ordinamento e gestione degli stati degli ordini.*

> ⚠️ *Quando l’amministratore modifica lo stato di un ordine, l’utente riceve una notifica in tempo reale tramite SignalR.  
Se l’utente non è loggato, la notifica viene salvata nel database.*
<p align="center">
  <img src="./readmeImg/5_orders.gif" width="800">
</p>

---

### Gestione Support Tickets

> *Quando un utente crea un ticket, gli amministratori vengono avvisati tramite notifica.*

> *Oltre alla visualizzazione, al sorting e alla gestione degli stati, gli admin possono rispondere direttamente alle richieste degli utenti.*
<p align="center">
  <img src="./readmeImg/5_tickets.gif" width="800">
</p>

---

## 🎁 Piccolo bonus - Opinioni

> *Gli utenti registrati possono lasciare una recensione descrivendo la loro esperienza e assegnando un voto da 1 a 5*
<p align="center">
  <img src="./readmeImg/6_other.png" width="800">
</p>

---
---

<p align="center">
~ Grazie per l'attenzione! ~
</p>

<p align="center">
  <img src="./readmeImg/mua.gif" width="200">
</p>

---
---

# DJ-Roso
DJ-Roso Discord bot za muziku

----------------------------------------------------------
**Uvod**
-
**Pozdrav svima!**
Čast mi je predstaviti novitet u našem serveru - DJ Rosu (v.0.1)!
DJ Roso je bot za puštanje muzike u pozivima, nazvan po najpoznatijem DJ-u u našem razredu. DJ Roso može puštati pjesme sa YouTube-a, Spotify-a i ostalih streaming servisa, također podržava prevljenje playlista, miješanje istih te preskakanje pjesama na istima. Također može pauzirati reprodukciju pjesme te može ispisati progress i trajanje.
Kako bi mogli početi koristiti DJ Rosu bilo bi dobro da vas upoznam sa komandama.
Komande se mogu pisati u bilo koji text channel, ali preporučljivo je da koristi #bot-komande kako se ne bi zagušivali ostali kanali.
Komande se pišu tako da stavite / i (bez razmaka) napišete riječ (komandu) te razmak pa argument (opcionalno ako nije napomenuto drugačije).
Moguće komande su:
  - /igraj - pušta pjesmu, argument* je ili link na pjesmu/playlistu ili riječi, u slučaju da su upisane riječi bot pretražuje YouTube i pušta prvi rezultat, u slučaju playliste pušta prvu po redu pjesmu, a ostale zanemaruje, a u slučaju pjesme pušta pjesmu, nakon što je pjesma gotova a nema drugih pjesama na popisu bot ne pošta ništa. Komandu /igraj možete koristiti jednu za drugom te tada bot stavlja pjesme na popis po redu kojim ste ih pisali te ih pušta jednu po jednu istim redoslijedom
  - /info - prikazuje informacije o pjesmi koja trenutno svira te slider koliko je pjesme prošlo, komanda nema argumente
  - /red - prikazuje informacije o popisu pjesama, koliko je pjesamam na popisu i na kojoj su poziciji, koje su i tko ih je pustio, prikazuje se prvih 10 pjesama po stranici, prima opcionalni argument broja stranice
  - /mesaj - mijenja redoslijed puštanja pjesama na popisu, nema argument
  - /pauza - zaustavlja pjesmu, nema argument
  - /nastavi - nastavlja s puštanjem pjesme tamo gdje ste ju zaustavili komandom /pauza, nema argument
  - /preskoci - preskače i brise trenutnu pjesmu sa popisa i pušta sljedeću po redu, nema argument
  - /preskocina - preskače na zadanu pjesmu na popisu i briše sve pjesme koje su prije nje, argument* je pozitivan cijeli broj, odnsosno redni broj pjesme sa popisa koju želite pustiti
   - /stop - zaustavlja muziku, briše popis i isključuje se iz poziva
*argument je neophodan za funkcioniranje komande i ne možete poslati komandu bez argumenta

----------------------------------------------------------

**Poznati problemi**
-
Pošto se o nekim libraryima o kojima DJ-Roso ovisi promijenila logika, a sterije verzije tih librarya baš i ne funkcioniraju DJ-Roso je samim time postao nefunkcionalan te je vjerojatno najbolje rješenje napisati ga opet it nule.
----------------------------------------------------------

**Sljedeći update (DJ Roso v0.0.2)**
-
  - mogucnost micanja točno određene pjesme s popisa bez micanja onih prije nje (kao sto to radi /preskocina komanda)
  - komanda za ispis mogucih komandi s njihovim objasnjenjima (nesto kao ova poruka)
Također, primam prijedloge za unaprijeđivanje bota (u DM).

Pozdrav do sljedećeg updatea! 

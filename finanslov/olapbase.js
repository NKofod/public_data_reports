var filterWindow
var strukturWindow
var rapportWindow
var tempStruktur
function loadImage(img) {
   imageObject = new Image()
   imageObject.src = img
   return imageObject
}
function swapImage() {
   var re1 = /.gif/
   var re2 = /2.gif/
   if (document[swapImage.arguments[0]].src.indexOf("2.gif") == -1)
      document[swapImage.arguments[0]].src = document[swapImage.arguments[0]].src.replace(re1,"2.gif")
   else
      document[swapImage.arguments[0]].src = document[swapImage.arguments[0]].src.replace(re2,".gif")
}
function retStruktur() {
   document.olapbase.strukturx.value = document.olapbase.struktur.value
   document.olapbase.rapnivx.value = document.olapbase.rapniv.value
   Width = 480
   Height = 500
   posleft = (screen.availWidth - Width) / 2
   postop = ((screen.availHeight - Height) / 2) - 20
   strukturWindow = window.open("index.cgi?FUNK=STRUKTUR","strukturWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width="+Width+",height="+Height+",left="+posleft+",top="+postop)
   strukturWindow.focus()
}
function initStruktur(version) {
   tempStruktur = self.opener.document.olapbase.strukturx.value
   if (tempStruktur != "")
      var struktArray = tempStruktur.split(" ")
   else {
      var struktArray = new Array()
      struktArray.length = 0
   }
   antalVar = struktArray.length
   for (var i = 0; i < struktArray.length; i++) {
      curvar = struktArray[i]
      if (curvar.length > 0) {
         currentImage = eval("document.i" + curvar)
         currentImage.src = "/" + path + "/" + curvar + "2.gif"
      }
   }
   buildStruktur()
   for (var i = 0; i < document.olapbase.rapniv.length; i++) {
      if (document.olapbase.rapniv[i].value == self.opener.document.olapbase.rapnivx.value)
         document.olapbase.rapniv[i].checked = true
   }
   if (version == "U") {
      for (var i = 0; i < document.olapbase.frakol.length; i++) {
         if (document.olapbase.frakol[i].value == self.opener.document.olapbase.frakol.value)
            document.olapbase.frakol[i].selected = true
      }
      for (var i = 0; i < document.olapbase.tilkol.length; i++) {
         if (document.olapbase.tilkol[i].value == self.opener.document.olapbase.tilkol.value)
            document.olapbase.tilkol[i].selected = true
      }
   }
}
function sletStruktur() {
   tempStruktur = ""
   document.olapbase.rapniv[0].checked = true
   document.olapbase.rapniv[1].checked = false
   for (var i = 0; i < strukturVariable.length; i++) {
      var curvar = strukturVariable[i]
      currentImage = eval("document.i" + curvar)
      currentImage.src = "/" + path + "/" + curvar + ".gif"
   }
   antalVar = 0
   buildStruktur()
}
function gemStruktur1() {
   strukturWindow.close()
   document.olapbase.funk.value = "OPSLAG"
   document.olapbase.submit()
}
function gemStruktur2(version) {
   self.opener.document.olapbase.struktur.value = self.opener.document.olapbase.strukturx.value
   for (var i = 0; i < document.olapbase.rapniv.length; i++) {
      if (document.olapbase.rapniv[i].checked == true)
         self.opener.document.olapbase.rapniv.value = document.olapbase.rapniv[i].value
   }
   if (version == "U") {
      self.opener.document.olapbase.frakol.value = document.olapbase.frakol[document.olapbase.frakol.selectedIndex].value
      self.opener.document.olapbase.tilkol.value = document.olapbase.tilkol[document.olapbase.tilkol.selectedIndex].value
      if (self.opener.document.olapbase.frakol.value > self.opener.document.olapbase.tilkol.value)
         self.opener.document.olapbase.frakol.value = self.opener.document.olapbase.tilkol.value
   }
   self.opener.document.olapbase.raphdr.value = "Selvvalgt rapport."
   self.opener.document.olapbase.stdrapnv.value = ""
   self.opener.gemStruktur1()
}
function toggleVar(curvar,onOff) {
// OnOff=0: Kun toggle-til mulig
// OnOff=1: Både toggle-til og toggle-fra mulig
   var struktArray = tempStruktur.split(" ")
   var fundet = false
   for (var i = 0; i < struktArray.length; i++) {
      if (struktArray[i] == curvar) {
         fundet = true
         if (onOff == 1) {
            struktArray[i] = ""
            currentImage = eval("document.i" + curvar)
            currentImage.src = "/" + path + "/" + curvar + "2.gif"
            antalVar -= 1
         }
         break
      }
   }
   if (fundet == false) {
      if (antalVar < maxVar) {
         var i = struktArray.length
         struktArray[i] = curvar
         currentImage = eval("document.i" + curvar)
         if (onOff == 1)
            currentImage.src = "/" + path + "/" + curvar + ".gif"
         else
            currentImage.src = "/" + path + "/" + curvar + "2.gif"
         antalVar += 1
      }
      else {
         if (onOff == 1)
            alert("Der kan maksimalt vælges 10 niveauer i rapporten")
      }
   }
   tempStruktur = ""
   for (var i = 0; i < struktArray.length; i++) {
      curvar = struktArray[i]
      if (curvar.length > 0) {
         if (tempStruktur != "")
            tempStruktur += " "
         tempStruktur += curvar
      }
   }
   buildStruktur()
}
function toggleKontoplan() {
   for (var i = 0; i < kontoplanVariable.length; i++) {
      toggleVar(kontoplanVariable[i],0)
   }
}
function toggleOkontoplan() {
   for (var i = 0; i < okontoplanVariable.length; i++) {
      toggleVar(okontoplanVariable[i],0)
   }
}
function toggleRamme() {
   for (var i = 0; i < rammeVariable.length; i++) {
      toggleVar(rammeVariable[i],0)
   }
}
function buildStruktur() {
   var struktArray = tempStruktur.split(" ")
   var j = -1
   for (var i = 0; i < struktArray.length; i++) {
      curvar = struktArray[i]
      j += 1
      if (j > 0) {
         currentImage = eval("document.corner" + j)
         currentImage.src = "/" + path + "/corner.gif"
      }
      currentImage = eval("document.sel" + j)
      currentImage.src = "/" + path + "/" + curvar + ".gif"
   }
   for (var i = antalVar; i < maxVar; i++) {
      if (i > 0) {
         currentImage = eval("document.corner" + i)
         currentImage.src = "/" + path + "/spacer.gif"
      }
      currentImage = eval("document.sel" + i)
      currentImage.src = "/" + path + "/spacer.gif"
   }
   self.opener.document.olapbase.strukturx.value = tempStruktur
}
function retFilter() {
   for (var i = 0; i < varNavne.length; i++) {
      var varx = varNavne[i]
      var rVar = eval("document.olapbase.r" + varx)
      var rxVar = eval("document.olapbase.rx" + varx)
      rxVar.value = rVar.value
      var qVar = eval("document.olapbase.q" + varx)
      var qxVar = eval("document.olapbase.qx" + varx)
      qxVar.value = qVar.value
      var kVar = eval("document.olapbase.k" + varx)
      var kxVar = eval("document.olapbase.kx" + varx)
      kxVar.value = kVar.value
      var filterListe = eval("filterListe" + varx)
      var filterListex = eval("filterListex" + varx)
      for (var j = 0; j < filterListe.length; j++) {
         filterListex[j] = filterListe[j]
      }
   }
   var finansar = document.olapbase.qFINAR.value
   Width = 512
   Height = 400
   posleft = (screen.availWidth - Width) / 2
   postop = ((screen.availHeight - Height) / 2) - 20
   filterWindow = window.open("index.cgi?FUNK=FILTER&QFINAR="+finansar+"","filterWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width="+Width+",height="+Height+",left="+posleft+",top="+postop)
   filterWindow.focus()
}
function gemFilter1() {
   filterWindow.close()
   visFilter1()
   document.olapbase.funk.value = "OPSLAG"
   document.olapbase.submit()
}
function gemFilter2() {
   for (var i = 0; i < self.opener.varNavne.length; i++) {
      var varx = self.opener.varNavne[i]
      var rVar = eval("self.opener.document.olapbase.r" + varx)
      var rxVar = eval("self.opener.document.olapbase.rx" + varx)
      rVar.value = rxVar.value
      var qVar = eval("self.opener.document.olapbase.q" + varx)
      var qxVar = eval("self.opener.document.olapbase.qx" + varx)
      qVar.value = qxVar.value
      var filterListe = eval("self.opener.filterListe" + varx)
      var filterListex = eval("self.opener.filterListex" + varx)
      filterListe.length = 0
      for (var j = 0; j < filterListex.length; j++) {
         filterListe[j] = filterListex[j]
      }
      var kVar = eval("self.opener.document.olapbase.k" + varx)
      kVar.value = filterListe.join("|")
   }
   self.opener.document.olapbase.raphdr.value = "Selvvalgt rapport."
   self.opener.document.olapbase.stdrapnv.value = ""
   self.opener.gemFilter1()
}
function sletFilter(sletVar) {
   if (sletVar != "") {
      if (sletVar != "FINAR") {
         var rxVar = eval("self.opener.document.olapbase.rx" + sletVar)
         rxVar.value = "="
         var qxVar = eval("self.opener.document.olapbase.qx" + sletVar)
         qxVar.value = ""
         var filterListex = eval("self.opener.filterListex" + sletVar)
         filterListex.length = 0
         var kVar = eval("self.opener.document.olapbase.k" + sletVar)
         kVar.value = ""
      }
   }
   else {
      for (var i = 0; i < self.opener.varNavne.length; i++) {
         var varx = self.opener.varNavne[i]
         if (varx != "FINAR") {
            var rxVar = eval("self.opener.document.olapbase.rx" + varx)
            rxVar.value = "="
            var qxVar = eval("self.opener.document.olapbase.qx" + varx)
            qxVar.value = ""
            var filterListex = eval("self.opener.filterListex" + varx)
            filterListex.length = 0
            var kVar = eval("self.opener.document.olapbase.k" + varx)
            kVar.value = ""
         }
      }
      document.olapbase.filtervar.value = "FINAR"
   }
   getValues()
}
function visFilter1() {
   document.olapbase.filter.value = ""
   for (var i = 0; i < varNavne.length; i++) {
      var varx = varNavne[i]
      var varTekst = eval("varTekster." + varx)
      var relx = eval("document.olapbase.r" + varx + ".value")
      var filterListe = eval("filterListe" + varx)
      for (var j = 0; j < filterListe.length; j++) {
         document.olapbase.filter.value += varTekst + relx + filterListe[j] + "\n"
      }
   }
}
function visFilter2() {
   document.olapbase.filter.value = ""
   for (var i = 0; i < self.opener.varNavne.length; i++) {
      var varx = self.opener.varNavne[i]
      var varTekst = eval("self.opener.varTekster." + varx)
      var relx = eval("self.opener.document.olapbase.rx" + varx + ".value")
      var filterListex = eval("self.opener.filterListex" + varx)
      for (var j = 0; j < filterListex.length; j++) {
         document.olapbase.filter.value += varTekst + relx + filterListex[j] + "\n"
      }
   }
}
function getValues() {
   document.olapbase.funk.value = "FILTER"
   document.olapbase.submit()
}
function opbygQvar(felt,mult) {
   var qVar = eval("self.opener.document.olapbase.qx" + felt)
   var filterListex = eval("self.opener.filterListex" + felt)
   qVar.value = ""
   filterListex.length = 0
   if (mult == "1" && document.olapbase.vaerdier[0].selected) {
      for (var i = 0; i < document.olapbase.vaerdier.length; i++) {
         document.olapbase.vaerdier[i].selected = false
      }
   }
   else {
      var j = -1
      for (var i = mult; i < document.olapbase.vaerdier.length; i++) {
         if (document.olapbase.vaerdier[i].selected) {
            if (qVar.value == "")
               qVar.value = document.olapbase.vaerdier[i].value
            else
               qVar.value += ", " + document.olapbase.vaerdier[i].value
            j++
            filterListex[j] = document.olapbase.vaerdier[i].text
         }
      }
      if (felt == "FINAR")
         document.olapbase.qFINAR.value = document.olapbase.vaerdier[document.olapbase.vaerdier.selectedIndex].value
   }
   visFilter2()
}
function opbygSelect(felt) {
   var rVar = eval("self.opener.document.olapbase.rx" + felt)
   for (var i = 0; i < document.olapbase.relation.length; i++) {
      if (document.olapbase.relation[i].value == rVar.value)
         document.olapbase.relation[i].selected = true
   }
   var qVar = eval("self.opener.document.olapbase.qx" + felt)
   var i = 0
   var wVar = qVar.value
   while (wVar != "") {
      komma = wVar.indexOf(",")
      if (komma == -1) {
         val = wVar
         wVar = ""
      }
      else {
         val = wVar.substr(0,komma)
         komma += 2
         wVar = wVar.substr(komma)
      }
      while (i < document.olapbase.vaerdier.length && document.olapbase.vaerdier[i].value < val) {
         i++
      }
      if (i < document.olapbase.vaerdier.length && document.olapbase.vaerdier[i].value == val) {
         document.olapbase.vaerdier[i].selected = true
         i++
      }
   }
   visFilter2()
}
function skiftRelation(felt) {
   var rxVar = eval("self.opener.document.olapbase.rx" + felt)
   rxVar.value = document.olapbase.relation.options[document.olapbase.relation.selectedIndex].value
   visFilter2()
}
function standardRapport() {
   Width = 512
   Height = 390
   posleft = (screen.availWidth - Width) / 2
   postop = ((screen.availHeight - Height) / 2) - 20
   rapportWindow = window.open("index.cgi?FUNK=RAPPORT","rapportWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width="+Width+",height="+Height+",left="+posleft+",top="+postop)
   rapportWindow.focus()
}
function visRapbeskriv() {
   document.olapbase.rapport.value = document.olapbase.rapporter.options[document.olapbase.rapporter.selectedIndex].value
   document.olapbase.funk.value = "RAPBESKRIV"
   document.olapbase.submit()
}
function visRapbeskriv2(thisRapport) {
   Width = 500
   Height = 225
   posleft = (screen.availWidth - Width) / 2
   postop = ((screen.availHeight - Height) / 2) - 20
   beskrivWindow = window.open("index.cgi?FUNK=RAPBESKRIV2&RAPPORT=" + thisRapport + "","beskrivWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width="+Width+",height="+Height+",left="+posleft+",top="+postop)
   beskrivWindow.focus()
}
function gemRapport1() {
   rapportWindow.close()
   document.olapbase.funk.value = "GEMRAPPORT"
   document.olapbase.submit()
}
function gemRapport2() {
   var nonblank = /\S/
   if (nonblank.test(self.opener.document.olapbase.struktur.value) == false)
      alert("Der er ingen rapportstruktur at gemme")
   else if (nonblank.test(document.olapbase.raptekst.value) == false)
      alert("Der skal angives et navn (kort beskrivelse)")
   else if (nonblank.test(document.olapbase.rapbesk.value) == false)
      alert("Der skal angives en beskrivende tekst")
   else {
      self.opener.document.olapbase.raptekst.value = document.olapbase.raptekst.value
      self.opener.document.olapbase.rapbesk.value = document.olapbase.rapbesk.value
      if (document.olapbase.fininkl.checked)
         self.opener.document.olapbase.fininkl.value = "1"
      else
         self.opener.document.olapbase.fininkl.value = "0"
      if (document.olapbase.standard.checked)
         self.opener.document.olapbase.standard.value = "1"
      else
         self.opener.document.olapbase.standard.value = "0"
      self.opener.gemRapport1()
   }
}
function sletRapport() {
   if (document.olapbase.rapporter.selectedIndex == -1)
      alert("Markér den rapport, der skal slettes")
   else {
      var rapx = document.olapbase.rapporter[document.olapbase.rapporter.selectedIndex].value
      if (confirm("Bekræft, at rapport " + rapx + " skal slettes")) {
         document.olapbase.fininkl.checked = false
         document.olapbase.standard.checked = false
         document.olapbase.funk.value = "SLETRAPPORT"
         document.olapbase.rapport.value = document.olapbase.rapporter.options[document.olapbase.rapporter.selectedIndex].value
         document.olapbase.submit()
      }
   }
}
function hentRapport1() {
   rapportWindow.close()
   document.olapbase.funk.value = "HENTRAPPORT"
   document.olapbase.submit()
}
function hentRapport2() {
   if (document.olapbase.rapporter.selectedIndex == -1)
      alert("Markér den ønskede rapport")
   else {
      self.opener.document.olapbase.rapport.value = document.olapbase.rapporter.options[document.olapbase.rapporter.selectedIndex].value
      self.opener.hentRapport1()
   }
}
function drillDown(selectedVal) {
   var curvar = document.olapbase.curvar.value
   var curval = eval("document.olapbase." + curvar)
   var keylength = selectedVal.indexOf(" ")
   curval.value = selectedVal.substr(0,keylength)
   var upval = eval("document.olapbase.up" + curvar)
   upval.value = selectedVal
   document.olapbase.funk.value = "DRILLDOWN"
   document.olapbase.submit()
}
function drillUp(backVar) {
   document.olapbase.backvar.value = backVar
   document.olapbase.funk.value = "DRILLUP"
   document.olapbase.submit()
}
function collapse(collapseVar) {
   document.olapbase.collapse.value = collapseVar
   document.olapbase.funk.value = "COLLAPSE"
   document.olapbase.submit()
}
function visAnm(anmArg) {
   var anmAar = anmArg.substr(0,2)
   var anmPubl = anmArg.substr(2,1)
   var anmTopic = anmArg.substr(3)
   if (anmPubl == "3")
      anmPubl = "FL"
   else if (anmPubl == "4")
      anmPubl = "TB"
   else if (anmPubl == "5")
      anmPubl = "R"
   else
      anmPubl = "FFL"
   if (anmPubl == "FFL") {                  // Publikation = FFL
      if (anmAar >= "96" || anmAar <= "14" || anmAar == "17")
         var publType = "A"                 // Indtil 2014 (+2017): "A"
      else if (anmAar <= "21")              // 2015-2021 (-2017): Blank
         var publType = ""
      else {                                // Fra 2022: FFL i 2 books
         if (anmTopic.substr(0,2) <= "19")  // § 1-19 i book 1
            publType = "-1"
         else                               // Resten i book 2
            publType = "-2"
      }
   }
   if (anmPubl == "FL") {                   // Publikation = FFL
      if (anmAar >= "96" || anmAar <= "14")
         var publType = "A"                 // Indtil 2014: "A"
      else if (anmAar <= "21")              // 2015-2021: Blank
         var publType = ""
      else {                                // Fra 2022: FL i 2 books
         if (anmTopic.substr(0,2) <= "19")  // § 1-19 i book 1
            publType = "-1"
         else                               // Resten i book 2
            publType = "-2"
      }
   }
   if (anmPubl == "TB") {                   // Publikation = TB
      if (anmAar >= "96" || anmAar <= "13")
         var publType = "A"                 // Indtil 2013: "A"
      else                                  // Fra 2014: Blank
         var publType = ""
   }
   if (anmPubl == "R") {                    // Publikation = R
      var publType = "A"                    // For alle år: "A"
   }
   if (anmTopic.length == 3)
      anmTopic = anmTopic.substr(0,2) + "." + anmTopic.substr(2)
   else if (anmTopic.length == 4)
      anmTopic = anmTopic.substr(0,2) + "." + anmTopic.substr(2)
   else if (anmTopic.length == 6)
      anmTopic = anmTopic.substr(0,2) + "." + anmTopic.substr(2,2) + "." + anmTopic.substr(4)
   else if (anmTopic.length == 8)
      anmTopic = anmTopic.substr(0,2) + "." + anmTopic.substr(2,2) + "." + anmTopic.substr(4,2)
   if (anmTopic.substr(0,1) == "0")
      anmTopic = anmTopic.substr(1)
   W = screen.availWidth / 100 * 97
   H = screen.availHeight / 100 * 96
  anmWindow = window.open("/bevillingslove/doctopic.cgi?book=BEVPUBL."+anmPubl+anmAar+publType+"&topic="+anmTopic+"&searchtype=3","anm","toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,width="+W+",height="+H+",left=0,top=0")
   anmWindow.focus()
}
function visVejledning(helpDok) {
   Width = 680
   Height = 480
   posleft = (screen.availWidth - Width) / 2
   postop = ((screen.availHeight - Height) / 2) - 20
   helpWindow = window.open("index.cgi?FUNK=HELP&HELPDOK="+helpDok+"","helpWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width="+Width+",height="+Height+",left="+posleft+",top="+postop)
   helpWindow.focus()
}

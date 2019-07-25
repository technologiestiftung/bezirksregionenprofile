<template>
<body>
  <section class="container">
    <div>
      <br>
      <h2>Über den Monitor</h2>
      <p>
      Der Berliner Bezirksregionen Monitor ist ein Projekt des Ideation & Prototyping Lab der Technologiestiftung Berlin. Es ist ein Prototyp für ein Tool, dass den Datenkoordinator*innen der einzelnen Bezirke ermöglicht, die Bezirksregionenprofile in einer webbasierten, interaktiven Anwendung den Bürger*innen zur Verfügung zu stellen. 
      Die Daten der Kernindikatoren werden den Datenkoordinator*innen vom Amt für Statistik Berlin Brandenburg geliefert. Die Datenkoordinator*innen erstellen die Bezirksregionenprofile auf Basis der Kernindikatoren in einer vorgegeben Struktur von 14 Überpunkten:
      <ol style="margin-left: 30px">
      <li style="list-style: block">Kurzporträt der Bezirksregion</li>
      <li style="list-style: block">Demografische Struktur und Entwicklung
      <li style="list-style: block">Soziale Situation</li>
      <li style="list-style: block">Bildungssituation</li>
      <li style="list-style: block">Gesundheitliche Situation</li>
      <li style="list-style: block">Wirtschafts- und Gewerbestruktur</li>
      <li style="list-style: block">Wohnsituation</li>
      <li style="list-style: block">Soziale Infrastruktur</li>
      <li style="list-style: block">Grüne Infrastruktur und öffentlicher Raum</li>
      <li style="list-style: block">Mobilität</li>
      <li style="list-style: block">Umwelt (Lärmbelastung / Luftbelastung / Bioklima)</li>
      <li style="list-style: block">Förderprogramme und Projekte</li>
      <li style="list-style: block">Partizipation: Strukturen der Akteursvernetzung und Bürgerbeteiligung</li>
      <li style="list-style: block">Zusammenfassung: Potenziale und Herausforderungen</li>
      </ol>
      </p>
      <br>
      <h2>Datengrundlage</h2>
      <p>
        Die Daten der Kernindikatoren stammen von xxx und sind hier verfügbar xxx.
        Die Datenprofile der einzelnen Bezirksregionen stammen von den jeweiligen Datenkoordinator*innen.
        Auf die ursprünglichen Profile wird auf der Seite der jeweiligen Bezirksregion verlinkt.
      </p>
      <br>

      <h2>Beschreibung der einzelnen Kernindikatoren</h2>
      <p>
      Die Kernindikatoren sind ein berlinweit abgestimmtes Indikatorenset, mit dem im Rahmen der integrierten Stadtteilentwicklung die Vergleichbarkeit der Ist-Situation und der Entwicklung in den Bezirksregionen bezirksintern und bezirksübergreifend gewährleistet werden soll.
      Die Kernindikatoren bilden dabei sozialräumliche Daten zur demografischen Struktur einer Bezirksregion ab und untersuchen u.a. Merkmale zu Armutsrisiken, Entwicklungsbedingungen für Kinder und Jugendliche oder aber auch Stabilität und Dynamik der Wohnbevölkerung einer Bezirksregion.
      Insgesamt gibt es 23 Kernindikatoren, die 6 Rubriken zugeordnet werden können.
      Der Berliner Bezirkregionen Monitor bildet wiederum 22 (E4 wird nicht erfasst) Kernidikatoren aus 5 Rubriken ab. 
      Nachfolgend werden die 5 Rubriken und ihre dazugehörigen Kernindikatoren kurz beschrieben
      <span id="dots">...</span>
      </p>
      
      <!-- TEST RUBRIK - NOT WORKING -->
      <span id="more">
      <h4>Wohnen</h4>
      <p>Die Rubrik Wohnen beschreibt die Merkmale der Bezirksregion als Wohnort.</p>
      <h5>Kernindikator A4 - Grünanlagen</h5>
      <p>
      Gibt das Verhältnis zwischen öffentlichen Grünanlagen und Einwohner/innen an.
      Die Angabe erfolgt in Quadratmeter pro Einwohner/in. Als öffentliche Grünanlagen werden dabei folgende Grünanlagen berücksichtigt: Grünanlagen in Wohngebieten, Parks und Erholungsgebiete, Stadtplätze, Ufergrünzüge, Badewiesen und Kinderspielplätze.
      Nicht eingerechnet werden die eintrittspflichtigen Anlagen (Britzer Garten, Botanischer Garten, Erholungspark Marzahn, Naturpark Schöneberger Südgelände, Botanische Anlage Blankenfel-de, Tierpark, Zoologischer Garten).
      </p>
      </span>
      <!-- span "more" closes -->

      <button onclick="readMore()" id="myBtn">Alle Kernindikatoren anzeigen</button>

      <br>
      <br>
      <h2>Bezirksregionenprofile</h2>
      <h3>Rahmen für integrierte Entwicklung</h3>
      <p> Die Bezirksregionenprofile sind ein wesentlicher Baustein für die Umsetzung der Sozialraumorientierung im Kontext der Rahmenstrategie Soziale Stadt(teil)Entwicklung. Sie beschreiben den Ist-Zustand und die Entwicklung der Bezirksregionen. Sie bilden eine einheitliche und (berlinweit) abgestimmte Arbeits- und Verständigungsgrundlage für ein sozialraumorientiertes, gemeinsames und abgestimmtes Handeln von Verwaltung, Politik, lokalen Akteur_en und Bewohner_innen. Mit ihnen wird ein Überblick über die vielschichtigen Herausforderungen und ungleichzeitigen Entwicklungsprozesse auf Bezirksregionenebene wie auch ein aktueller Überblick über die Fachplanungen ermöglicht.
      Das Bezirksregionenprofil kann dabei keine fachlichen Entscheidungen und politischen Aushandlungsprozesse über Maßnahmen und Mittelverteilung ersetzen. Es soll vielmehr ein qualifiziertes Blitzlicht auf die aktuelle Situation in der Bezirksregion und die verschiedenen stadtentwicklungspolitischen Bereiche werfen. Das betrifft neben den sozialen auch die baulichen, wirtschaftlichen und infrastrukturellen Komponenten.
      </p>
      
      <br>
      <h3>Inhalt der Bezirksregionenprofile</h3>
      <p>
      Bezirksregionenprofile enthalten eine Analyse (Teil I – Analyse und Beschreibung) und einen konzeptionellen Teil (Teil II – Ziele und Maßnahmen).
      Die Basis des Analyseteils Teil I sind sog. Kernindikatoren und statistische Grunddaten des Amtes für Statistik Berlin-Brandenburg. Diese Daten werden zwischen den Senatsverwaltungen und Bezirken Berlins abgestimmt, in einem Datenpool zusammengetragen und jährlich zur Verfügung gestellt.
      Der konzeptionelle Teil II ist darauf ausgerichtet Maßnahmen und Ziele zum einen mit den Fachämtern und zum anderen mit lokalen Akteuren sowie den Bürger_innen in einer Bezirksregion zu erarbeiten. Dadurch kann eine übergeordnete und interdisziplinäre Betrachtung der Bedarfe und Potenziale vorgenommen werden und integrierte Zielsetzungen festgelegt werden.
      </p>
      
      <br>
      <h3>Gliederung</h3>
      <p>Die Gliederung der Profile ist in Berlin einheitlich. Damit wird eine innerbezirkliche und berlinweite Vergleichbarkeit ermöglicht. Neben den statistischen Fakten enthält das Bezirksregionenprofil weitere, lokal erhobene, Daten und fachliche Stellungnahmen. Die einzelnen Bausteine des Bezirksregionenprofils werden ämterübergreifend erarbeitet („integriertes Profil“). Die Erstellung erfolgt stufenweise.
      </p>

      <br>
      <h3>Fortschreibung</h3>
      <p>Die Fortschreibung des Teil I der Bezirksregionenprofile erfolgt in einem zweijährigen Rhythmus, die Federführung liegt bei der Datenkoordination der Organisationseinheit Sozialraumorientierte Planungskoordination.
      </p>
      <p><a href="https://www.berlin.de/ba-tempelhof-schoeneberg/politik-und-verwaltung/service-und-organisationseinheiten/sozialraumorientierte-planungskoordination/bzrp-677061.php">Quelle: Bezirksamt Tempelhof-Schöneberg</a>
      </p>
    </div>
  </section>
</body>
</template>

<style>
.container {
  min-height: 100vh;
  display: flex;
  padding: 25px;
/*  justify-content: center;*/
/*  align-items: center;
  text-align: center;*/
}

#more {display: none;}

#myBtn {
    background-color: #1E3791;
    font-size: 0.8em;
    color: white;
    padding: 0.8em;
    margin-top: 1.5em;
    margin-bottom: 1em;  
    cursor: pointer;
    border: 2px;
}

#myBtn:hover {
    background-color: #04A6F0;
    font-size: 0.8em;
    color: white;
    padding: 0.8em;
    margin-top: 1.5em;
    margin-bottom: 1em;  
    cursor: pointer;
    border: 2px;
}
</style>


<script>

function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display !== "none"){
    dots.style.display = "none";
    btnText.innerHTML = "Weniger anzeigen";
    moreText.style.display = "Alle Kernindikatoren anzeigen";
  }

  else {
    dots.style.display = "inline";
    btnText.innerHTML = "Weniger anzeigen";
    moreText.style.display = "none";
  }
} 

export default {

}


</script>



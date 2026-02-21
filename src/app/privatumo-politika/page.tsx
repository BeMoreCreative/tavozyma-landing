import type { Metadata } from "next";
import Link from "next/link";
import { nunito } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Privatumo politika | TavoZyma.lt",
  description:
    "TavoZyma.lt privatumo politika. Kaip renkame, saugome ir naudojame jusu asmens duomenis.",
};

export default function PrivatumoPolitika() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-dark bg-bg-primary/80 backdrop-blur-xl px-6 md:px-10">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between">
          <Link
            href="/"
            className={`${nunito.className} text-[26px] tracking-[-0.02em] text-text-on-dark`}
          >
            <span className="font-semibold">Tavo</span>
            <span className="font-extrabold text-accent">Žyma</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-text-on-dark-secondary hover:text-text-on-dark transition-colors duration-200"
          >
            Grįžti į pradžią
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-on-dark md:text-4xl">
          Privatumo politika
        </h1>
        <p className="mt-3 text-sm text-text-on-dark-secondary">
          Paskutinį kartą atnaujinta: 2026 m. vasario 21 d.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-text-on-dark-secondary font-body">
          {/* 1 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              1. Bendrosios nuostatos
            </h2>
            <p>
              Ši privatumo politika taikoma interneto svetainei{" "}
              <span className="text-accent">tavozyma.lt</span> (toliau
              &mdash; &bdquo;Svetainė&ldquo;), kurią administruoja{" "}
              <span className="text-text-on-dark">TavoŽyma</span> (toliau
              &mdash; &bdquo;mes&ldquo;, &bdquo;mūsų&ldquo;). Mes gerbiame
              jūsų privatumą ir įsipareigojame saugoti jūsų asmens duomenis
              pagal Europos Sąjungos Bendrąjį duomenų apsaugos reglamentą
              (BDAR / GDPR) ir Lietuvos Respublikos asmens duomenų teisinės
              apsaugos įstatymą.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              2. Kokie duomenys renkami
            </h2>
            <p className="mb-3">
              Svetainėje renkame tik šiuos asmens duomenis:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-text-on-dark">El. pašto adresas</span>{" "}
                &mdash; pateikiamas savanoriškai per laukimo sąrašo
                registracijos formą.
              </li>
              <li>
                <span className="text-text-on-dark">
                  Registracijos data ir laikas
                </span>{" "}
                &mdash; automatiškai fiksuojami pateikus formą.
              </li>
            </ul>
            <p className="mt-3">
              Nerenkame jokių kitų asmens duomenų, tokių kaip vardas, pavardė,
              telefono numeris ar mokėjimo informacija.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              3. Duomenų rinkimo tikslai
            </h2>
            <p className="mb-3">
              Jūsų el. pašto adresą naudojame tik šiuo tikslu:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-text-on-dark">
                  Pranešimas apie produkto paleidimą
                </span>{" "}
                &mdash; informuosime jus, kai TavoŽyma bus prieinamas
                naudojimui. Tai vienintelis tikslas, kuriam naudojamas jūsų
                el.&nbsp;pašto adresas.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              4. Duomenų tvarkymo teisinis pagrindas
            </h2>
            <p>
              Jūsų duomenys tvarkomi remiantis jūsų{" "}
              <span className="text-text-on-dark">sutikimu</span> (BDAR 6
              str. 1 d. a punktas), kurį suteikiate pateikdami savo el. pašto
              adresą registracijos formoje. Sutikimą galite bet kada atšaukti
              (žr. 8 skyrių).
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              5. Duomenų dalijimasis su trečiosiomis šalimis
            </h2>
            <p className="mb-3">
              Jūsų asmens duomenų{" "}
              <span className="text-text-on-dark">neparduodame</span> ir{" "}
              <span className="text-text-on-dark">
                nesidalijame su trečiosiomis šalimis
              </span>{" "}
              rinkodaros tikslais, išskyrus šiuos atvejus:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-text-on-dark">
                  Duomenų saugojimo paslaugos teikėjas (Upstash, Inc.)
                </span>{" "}
                &mdash; naudojame Upstash serverless Redis paslaugą
                registracijos duomenims saugoti. Duomenys saugomi ES regione.
                Šis paslaugų teikėjas tvarko duomenis tik pagal mūsų
                nurodymus ir privalo laikytis BDAR reikalavimų.
              </li>
              <li>
                <span className="text-text-on-dark">
                  Teisiniai reikalavimai
                </span>{" "}
                &mdash; duomenis galime atskleisti, jei to reikalauja Lietuvos
                Respublikos ar ES teisės aktai.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              6. Duomenų saugojimo laikotarpis
            </h2>
            <p>
              Jūsų el. pašto adresą saugome tol, kol jis reikalingas
              aukščiau nurodytiems tikslams pasiekti arba kol atšauksite savo
              sutikimą. Jei atšauksite sutikimą arba paprašysite ištrinti
              duomenis, jūsų el. pašto adresas bus ištrintas iš mūsų sistemų
              per{" "}
              <span className="text-text-on-dark">30 kalendorinių dienų</span>.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              7. Jūsų teisės (BDAR)
            </h2>
            <p className="mb-3">
              Pagal Bendrąjį duomenų apsaugos reglamentą turite šias teises:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-text-on-dark">Teisė susipažinti</span>{" "}
                &mdash; galite prašyti patvirtinimo, ar tvarkome jūsų duomenis,
                ir gauti jų kopiją.
              </li>
              <li>
                <span className="text-text-on-dark">Teisė ištaisyti</span>{" "}
                &mdash; galite prašyti pataisyti netikslius asmens duomenis.
              </li>
              <li>
                <span className="text-text-on-dark">
                  Teisė ištrinti (&bdquo;teisė būti pamirštam&ldquo;)
                </span>{" "}
                &mdash; galite prašyti, kad jūsų duomenys būtų ištrinti.
              </li>
              <li>
                <span className="text-text-on-dark">
                  Teisė apriboti tvarkymą
                </span>{" "}
                &mdash; tam tikrais atvejais galite prašyti apriboti jūsų
                duomenų tvarkymą.
              </li>
              <li>
                <span className="text-text-on-dark">
                  Teisė į duomenų perkeliamumą
                </span>{" "}
                &mdash; galite prašyti gauti savo duomenis struktūruotu,
                įprastai naudojamu formatu.
              </li>
              <li>
                <span className="text-text-on-dark">Teisė nesutikti</span>{" "}
                &mdash; galite bet kada nesutikti su duomenų tvarkymu
                tiesioginės rinkodaros tikslais.
              </li>
            </ul>
            <p className="mt-4">
              Norėdami pasinaudoti šiomis teisėmis, susisiekite su mumis el.
              paštu{" "}
              <a
                href="mailto:info@tavozyma.lt"
                className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
              >
                info@tavozyma.lt
              </a>
              . Į jūsų užklausą atsakysime per 30 dienų.
            </p>
            <p className="mt-3">
              Taip pat turite teisę pateikti skundą Valstybinei duomenų
              apsaugos inspekcijai (
              <a
                href="https://vdai.lrv.lt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
              >
                vdai.lrv.lt
              </a>
              ), jei manote, kad jūsų teisės buvo pažeistos.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              8. Kaip atsisakyti prenumeratos
            </h2>
            <p>
              Kiekviename mūsų siunčiamame el. laiške bus{" "}
              <span className="text-text-on-dark">
                atsisakymo nuoroda
              </span>{" "}
              (&bdquo;Atsisakyti prenumeratos&ldquo; /
              &bdquo;Unsubscribe&ldquo;). Paspaudę šią nuorodą, būsite
              pašalinti iš mūsų adresatų sąrašo. Taip pat galite bet kada
              parašyti mums el. paštu{" "}
              <a
                href="mailto:info@tavozyma.lt"
                className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
              >
                info@tavozyma.lt
              </a>{" "}
              su prašymu pašalinti jūsų duomenis.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              9. Slapukai (Cookies)
            </h2>
            <p>
              Šiuo metu Svetainė naudoja tik{" "}
              <span className="text-text-on-dark">
                būtinuosius techninius slapukus
              </span>
              , kurie reikalingi tinkamam svetainės veikimui užtikrinti. Šie
              slapukai nerenka jokios asmenį identifikuojančios informacijos ir
              yra automatiškai ištrinami uždarius naršyklę arba pasibaigus
              sesijai. Analitinių ar rinkodaros slapukų nenaudojame.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              10. Duomenų saugumas
            </h2>
            <p>
              Taikome tinkamas technines ir organizacines priemones jūsų
              asmens duomenims apsaugoti nuo neteisėtos prieigos, praradimo,
              sunaikinimo ar atskleidimo. Duomenys perduodami naudojant
              šifruotą (SSL/TLS) ryšį.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              11. Privatumo politikos pakeitimai
            </h2>
            <p>
              Galime retkarčiais atnaujinti šią privatumo politiką. Apie
              reikšmingus pakeitimus informuosime el. paštu arba paskelbsime
              pranešimą Svetainėje. Rekomenduojame periodiškai peržiūrėti šį
              puslapį.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-on-dark">
              12. Kontaktinė informacija
            </h2>
            <p>
              Jei turite klausimų apie šią privatumo politiką ar norite
              pasinaudoti savo teisėmis, susisiekite su mumis:
            </p>
            <div className="mt-4 rounded-xl border border-border-dark bg-bg-card p-6">
              <p className="text-text-on-dark font-medium">TavoŽyma</p>
              <p className="mt-2">
                El. paštas:{" "}
                <a
                  href="mailto:info@tavozyma.lt"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
                >
                  info@tavozyma.lt
                </a>
              </p>
              <p className="mt-1">Šalis: Lietuvos Respublika</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-dark bg-bg-primary px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="text-sm text-text-on-dark-secondary/60">
            <span className={nunito.className}>
              <span className="font-semibold">Tavo</span>
              <span className="font-extrabold text-accent">Žyma</span>
            </span>{" "}
            &middot; 2026
          </span>
          <Link
            href="/"
            className="text-sm text-text-on-dark-secondary/60 underline underline-offset-2 hover:text-text-on-dark-secondary transition-colors duration-200"
          >
            Pagrindinis puslapis
          </Link>
        </div>
      </footer>
    </div>
  );
}

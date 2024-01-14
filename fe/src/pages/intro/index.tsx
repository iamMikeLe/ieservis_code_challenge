import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import "./Intro.css";

function Intro(): JSX.Element {
  return (
    <div data-testid="intro" className="intro-wrapper">
      <MDBCard>
        <MDBCardBody>
          <h4>
            <strong>Zad&aacute;n&iacute;:</strong>
          </h4>
          <p>
            Navrhněte a naprogramujte jednoduchou aplikaci pro
            vytv&aacute;řen&iacute; PDF ze sady obr&aacute;zků.
          </p>
          <h6>
            <strong>Požadavky technick&eacute; specifikace:</strong>
          </h6>
          <p>BE:</p>
          <p>&emsp;- Jazyk: NodeJs, ExpressJs</p>
          <p>
            &emsp;- Ostatn&iacute; knihovny dle vlastn&iacute;ho v&yacute;běru
          </p>
          <p>FE:</p>
          <p>&emsp;- Jazyk: JS</p>
          <p>&emsp;- Framework dle vlastn&iacute;ho v&yacute;běru</p>
          <p>&emsp;- Build: např NPM, yarn</p>
          <p>
            <strong>Požadovky užit&iacute;:</strong>
          </p>
          <p>
            V aplikaci existuj&iacute; 2 typy uživatelsk&yacute;ch &uacute;čtů.
          </p>
          <p>&emsp;- Administr&aacute;tor</p>
          <p>&emsp;- Klient</p>
          <p>
            &bull; Administr&aacute;torovi aplikace umožňuje nakonfigurovat
            někter&eacute; aspekty chov&aacute;n&iacute;
          </p>
          <p>
            aplikace <strong>za běhu</strong> aplikace.
          </p>
          <p>
            &bull; Maxim&aacute;ln&iacute; počet obr&aacute;zků, ze
            kter&yacute;ch lze vytvořit PDF.
          </p>
          <p>
            &bull; Uzamknout aplikaci (nedovolit přihl&aacute;&scaron;en&iacute;
            klientovi).
          </p>
          <p>
            &bull; Klientovi aplikace pomoc&iacute; jednoduch&eacute;ho
            webov&eacute;ho formul&aacute;ře umožňuje nahr&aacute;t sadu
          </p>
          <p>
            obr&aacute;zků a vytvořen&iacute; PDF z nahran&yacute;ch
            obr&aacute;zků.
          </p>
          <p>
            &bull; Pro přihl&aacute;&scaron;en&iacute; klienta a/nebo
            administr&aacute;tora postač&iacute; jm&eacute;no a heslo natvrdo
          </p>
          <p>
            nakonfigurovan&eacute; v k&oacute;du aplikace, nicm&eacute;ně
            aplikace nesm&iacute; dovolit nepřihl&aacute;&scaron;en&eacute;mu
          </p>
          <p>
            uživateli přistoupit na webov&yacute; formul&aacute;ř pro
            generov&aacute;n&iacute; PDF ani administračn&iacute;
          </p>
          <p>
            rozhran&iacute;. Klient sm&iacute; pouze generovat PDF a
            administr&aacute;tor sm&iacute; jak generovat PDF, tak
          </p>
          <p>konfigurovat aplikaci.</p>
          <p>
            <strong>Požadavky na implementaci:</strong>
          </p>
          <p>
            &bull; Implementujte unit testy alespoň na některou z
            naimplementovan&yacute;ch komponent (dle
          </p>
          <p>
            vlastn&iacute;ho v&yacute;běru jak na FE tak na BE. Z&aacute;roveň
            si rozmyslete, co v&scaron;e by bylo vhodn&eacute; v aplikaci
          </p>
          <p>otestovat.</p>
          <p>
            &bull;K&oacute;d nahrajte na BitBucket/Github/Gitlab + vytvořte
            jednoduchou build/test pipeline &ndash; nen&iacute;
          </p>
          <p>
            třeba někam ukl&aacute;dat v&yacute;sledn&eacute; artifacty, pouze
            nakonfigurovat pipeline pro spu&scaron;těn&iacute; po
          </p>
          <p>commitu nebo PR, kter&aacute; projede unit testy.</p>
          <p>
            &bull;K&oacute;d pros&iacute;m napi&scaron;te nejl&eacute;pe jak
            dovedete. V&yacute;sledek pros&iacute;m nahrajte do veřejn&eacute;ho
          </p>
          <p>
            &bull;repozit&aacute;ře BitBucket/GitHub/GitLab a odkaz na
            repozit&aacute;ř za&scaron;lete
          </p>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default Intro;

<template>
    <div className="text-left">
      <div className="billLayout">
          <div className="">
              <div className="bold big">
                Inspection Report - <span className="medium">{{ report.auction_house.auctionhouse_name }}</span><span className="small">{{ report.auction_house.auctionhouse_address }}</span>
              </div>
          </div>
  
          <div className="centerContent">
              <div className="sectionHeader" >Vehicle Information</div>
  
              <table width=99%>
              <tr><td width=12%></td><td width=38%></td><td width=12%></td><td width=38%></td></tr>
              <tr><td className="subjclassName">Panel</td><td>:&nbsp;<span className="varField">{{ report.banker.name }}</span></td>
                  <td className="subjclassName">Presentation</td><td>:&nbsp;
                      <span className="_30portion">{{ report.investigation_report.drivetow }}</span>
                      Mode :&nbsp;
                      <span className="_44portion">{{ report.investigation_report.repossesedmethod }}</span>
                  </td>
              </tr>
              <tr><td className="subjclassName">Branch</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.branch }}</span></td>
                  <td className="subjclassName">Date In</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.reposseseddate }}</span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Time In</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.timein }}</span>
              </td>
              </tr>
              <tr>
                  <td className="subjclassName">Reg. No</td><td>:&nbsp;<span className="varField">{{ report.registration_number }}</span></td>
                  <td className="subjclassName">Mileage</td><td>:&nbsp;
                      <span className="_30portion">{{ report.investigation_report.mileage }}</span>
                      Road Tax :&nbsp;
                      <span className="_44portion">
              <span v-if="report.investigation_report.withroadtax">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.roadtax }}
                      </span>
                  </td>
              </tr>
  
              <tr><td className="subjclassName">Model</td><td>:&nbsp;<span className="varField  small">{{ report.model }}</span></td>
                  <td className="subjclassName">General Condition</td>
                  <td >:&nbsp;<span className="varField">{{ report.investigation_report.general_condition }}</span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Engine No</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.engine_number }}</span></td>
                  <td className="subjclassName">Chasis No</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.chasis_number }}</span></td>
              </tr>
              <tr>
                  <td className="subjclassName">RO Engine No</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.roengine_number }}</span></td>
                  <td className="subjclassName">RO Chasis No</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.rochasis_number }}</span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Transmission</td><td>:&nbsp;<span className="varField">{{ report.investigation_report.transmission }}</span></td>
                  <td className="subjclassName">Key</td><td>:&nbsp;
                      <span className="_30portion">
              <span v-if="report.investigation_report.withkey">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withkeyremarks }}
                      </span>
                      Remote :&nbsp;<span className="_44portion">
              <span v-if="report.investigation_report.withremote">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withremoteremarks }}
                      </span>
                  </td>
              </tr>
  
              <tr>
                  <td className="subjclassName"></td><td></td>
              </tr>
              </table>
              <br>
              <div className="sectionHeader" >Engine Components</div>
              <table width=99%>
              <tr><td width=12%></td><td width=38%></td><td width=12%></td><td width=38%></td></tr>
              <tr>
                  <td className="subjclassName">Engine</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withengine">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withengineremarks }}
                  </span></td>
                  <td className="subjclassName">Radiator</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withradiator">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withradiatorremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Gear Box</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withgearbox">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withgearboxremarks }}
                  </span></td>
                  <td className="subjclassName">Battery</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withbattery">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withbatteryremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Air-Cond</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withaircond">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withaircondremarks }}
                  </span></td>
                  <td className="subjclassName">Alternator</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withalternator">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withalternatorremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Break</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withbreak">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withbreakremarks }}
                  </span></td>
                  <td className="subjclassName">Power Steering</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withpowersteering">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withpowersteeringremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Remark</td><td colspan="3">:&nbsp;<span className="remarkLine">
                      {{ report.investigation_report.enginecomponentsremarks }}
                  </span></td>
              </tr>
  
              </table>
  <br>
              <div className="sectionHeader" >Interior Components</div>
              <table width=99%>
              <tr><td width=12%></td><td width=38%></td><td width=12%></td><td width=38%></td></tr>
              <tr>
                  <td className="subjclassName">Dash Board</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withdashboard">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdashboardremarks }}
                  </span></td>
                  <td className="subjclassName">Meter Gauge</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withmetergauge">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withmetergaugeremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Clock</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withclock">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withclockremarks }}
                  </span></td>
                  <td className="subjclassName">Cigarette Lighter</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withcigarettelighter">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withcigarettelighterremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Gear Knob</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withgearknob">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withgearknobremarks }}
                  </span></td>
                  <td className="subjclassName">Ashtray</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withashtray">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withashtrayremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Roof Light</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withrooflight">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withrooflightremarks }}
                  </span></td>
                  <td className="subjclassName">Floor Mats</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withfloormat">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withfloormatremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Door Lock</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withdoorlock">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorlockremarks }}
                  </span></td>
                  <td className="subjclassName">CD Changer</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withcdchanger">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withcdchangerremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Steering</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withsteering">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withsteeringremarks }}
                  </span></td>
                  <td className="subjclassName">3<sup>rd</sup> Break Light</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.with3rdbreaklight">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.with3rdbreaklightremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Seat</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
                      <span v-if="report.investigation_report.withseatfl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withseatflremarks }}
                      </span>
                      <span className="_23portion">FR
                      <span v-if="report.investigation_report.withseatfr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withseatfrremarks }}
                      </span>
                      <span className="_23portion">BL
                      <span v-if="report.investigation_report.withseatbl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withseatblremarks }}
                      </span>
                      <span className="_23portion">BR
                      <span v-if="report.investigation_report.withseatbr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withseatbrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName"></td><td colspan=3>:&nbsp;
                      <span className="_23portion">ML
                      <span v-if="report.investigation_report.withseatml">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withseatmlremarks }}
                      </span>
                      <span className="_23portion">MR
                      <span v-if="report.investigation_report.withseatmr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.remarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Door Trim</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
                      <span v-if="report.investigation_report.withdoorfl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorflremarks }}
                      </span>
                      <span className="_23portion">FR
                      <span v-if="report.investigation_report.withdoorfr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorfrremarks }}
                      </span>
                      <span className="_23portion">BL
                      <span v-if="report.investigation_report.withdoorbl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorblremarks }}
                      </span>
                      <span className="_23portion">BR
                      <span v-if="report.investigation_report.withdoorbr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorbrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Door Handle</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
                      <span v-if="report.investigation_report.withdoorhandlefl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorhandleflremarks }}
                      </span>
                      <span className="_23portion">FR
                      <span v-if="report.investigation_report.withdoorhandlefr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorhandlefrremarks }}
                      </span>
                      <span className="_23portion">BL
                      <span v-if="report.investigation_report.withdoorhandlebl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorhandleblremarks }}
                      </span>
                      <span className="_23portion">BR
                      <span v-if="report.investigation_report.withdoorhandlebr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withdoorhandlebrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Speaker</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
                      <span v-if="report.investigation_report.withspeakerfl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withspeakerflremarks }}
                      </span>
                      <span className="_23portion">FR
                      <span v-if="report.investigation_report.withspeakerfr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withspeakerfrremarks }}
                      </span>
                      <span className="_23portion">BL
                      <span v-if="report.investigation_report.withspeakerbl">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withspeakerblremarks }}
                      </span>
                      <span className="_23portion">BR
                      <span v-if="report.investigation_report.withspeakerbr">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withspeakerbrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Player</td><td colspan=3>:&nbsp;
                      <span className="_30portion">Cassette
                      <span v-if="report.investigation_report.withplayercassette">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withplayercassetteremarks }}
                      </span>
                      <span className="_30portion">CD
                      <span v-if="report.investigation_report.withplayercd">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withplayercdremarks }}
                      </span>
                      <span className="_30portion">Monitor
              <span v-if="report.investigation_report.withplayermonitor">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withplayermonitorremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Boot Interior Grade </td>
                  <td  colspan="4"> :&nbsp;
                      <span className="remarkLine">
              {{ report.investigation_report.bootinteriorgrade }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Spare Tyre</td><td colspan="3">:&nbsp;
                      <span className="_23portion">
              <span v-if="report.investigation_report.withsparetyre">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsparetyreremarks }}
                      </span>
                      Jack<span className="_23portion">:
              <span v-if="report.investigation_report.withsparetyrejack">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsparetyrejackremarks }}
                      </span>
                      Tools<span className="_23portion">:
              <span v-if="report.investigation_report.withsparetyretools">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsparetyretoolsremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Remark</td><td colspan="3"> :&nbsp;<span className="remarkLine">
                      {{ report.investigation_report.interiorcomponentsremarks }}
                  </span></td>
              </tr>
              </table>
  <br>
              <div className="sectionHeader" >Exterior Components</div>
              <table width=99%>
              <tr><td width=12%></td><td width=38%></td><td width=12%></td><td width=38%></td></tr>
              <tr>
                  <td className="subjclassName">Spoiler</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withspoiler">&#9745;&nbsp;</span>
            <span v-else>&#9744;&nbsp;</span>
            {{ report.investigation_report.withspoilerremarks }}
                  </span></td>
                  <td className="subjclassName">Exhaust Pipe</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withexhaustpipe">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withexhaustpiperemarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Paint Work</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withpaintwork">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.extpaintwork }}
                  </span></td>
                  <td className="subjclassName">Front Bumper</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withfrontbumper">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withfrontbumperremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Wheel Cap</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withwheelcap">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwheelcapremarks }}
                  </span></td>
                  <td className="subjclassName">Back Bumper</td><td>:&nbsp;<span className="varField">
                      <span v-if="report.investigation_report.withbackbumper">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withbackbumperremarks }}
                  </span></td>
              </tr>
              <tr>
                  <td className="subjclassName">Number Plate</td><td>:&nbsp;
                      F<span className="_44portion">
                      <span v-if="report.investigation_report.withnumberplatef">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withnumberplatefremarks }}
                      </span>
                      B<span className="_44portion">
                      <span v-if="report.investigation_report.withnumberplateb">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withnumberplatebremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Antena</td><td>:&nbsp;
                      F<span className="_44portion">
                      <span v-if="report.investigation_report.withantennaf">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withantennafremarks }}
                      </span>
                      B<span className="_44portion">
                      <span v-if="report.investigation_report.withantennab">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withantennabremarks }}
                      </span>
                  </td>
              </tr>
  
              <tr>
                  <td className="subjclassName">Sport Light</td><td>:&nbsp;
                      L<span className="_44portion">
                      <span v-if="report.investigation_report.withsportlightl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsportlightlremarks }}
                      </span>
                      R<span className="_44portion">
                      <span v-if="report.investigation_report.withsportlightr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsportlightrremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Front Lamp</td><td>:&nbsp;
                      L<span className="_44portion">
                      <span v-if="report.investigation_report.withfrontlampl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withfrontlamplremarks }}
                      </span>
                      R<span className="_44portion">
                      <span v-if="report.investigation_report.withfrontlampr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withfrontlamprremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Tail Lamp</td><td>:&nbsp;
                      L<span className="_44portion">
                      <span v-if="report.investigation_report.withtaillampl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtaillamplremarks }}
                      </span>
                      R<span className="_44portion">
                        <span v-if="report.investigation_report.withtaillampr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtaillamprremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Wind Screen</td><td>:&nbsp;
                      F<span className="_44portion">
              <span v-if="report.investigation_report.withwindscreenf">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindscreenfremarks }}
                      </span>
                      B<span className="_44portion">
              <span v-if="report.investigation_report.withwindscreenb">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindscreenbremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Side Mirror</td><td>:&nbsp;
                      L<span className="_44portion">
              <span v-if="report.investigation_report.withsidemirrorl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsidemirrorlremarks }}
                      </span>
                      R<span className="_44portion">
              <span v-if="report.investigation_report.withsidemirrorr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsidemirrorrremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Wipers</td><td>:&nbsp;
                      F<span className="_44portion">
              <span v-if="report.investigation_report.withwipersf">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwipersfremarks }}
                      </span>
                      B<span className="_44portion">
              <span v-if="report.investigation_report.withwipersb">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwipersbremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Front Signal</td><td>:&nbsp;
                      L<span className="_44portion">
              <span v-if="report.investigation_report.withfrontsignall">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withfrontsignallremarks }}
                      </span>
                      R<span className="_44portion">
              <span v-if="report.investigation_report.withfrontsignalr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withfrontsignalrremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Tail Signal</td><td>:&nbsp;
                      L<span className="_44portion">
              <span v-if="report.investigation_report.withtailsignall">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtailsignallremarks }}
                      </span>
                      R<span className="_44portion">
              <span v-if="report.investigation_report.withtailsignalr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtailsignalrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Side Signal</td><td>:&nbsp;
                      L<span className="_44portion">
              <span v-if="report.investigation_report.withsidesignall">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsidesignallremarks }}
                      </span>
                      R<span className="_44portion">
              <span v-if="report.investigation_report.withsidesignalr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withsidesignalrremarks }}
                      </span>
                  </td>
                  <td className="subjclassName">Emblem</td><td>:&nbsp;
                      F<span className="_44portion">
              <span v-if="report.investigation_report.withemblemf">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withemblemfremarks }}
                      </span>
                      B<span className="_44portion">
              <span v-if="report.investigation_report.withemblemb">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withemblembremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Tyres Size</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
              <span v-if="report.investigation_report.withtyresizefl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyresizeflremarks }}
                      </span>
                      <span className="_23portion">FR
              <span v-if="report.investigation_report.withtyresizefr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyresizefrremarks }}
                      </span>
                      <span className="_23portion">BL
              <span v-if="report.investigation_report.withtyresizebl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyresizeblremarks }}
                      </span>
                      <span className="_23portion">BR
              <span v-if="report.investigation_report.withtyresizebr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyresizebrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Tyres Brand</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
              <span v-if="report.investigation_report.withtyrebrandfl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyrebrandflremarks }}
                      </span>
                      <span className="_23portion">FR
              <span v-if="report.investigation_report.withtyrebrandfr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyrebrandfrremarks }}
                      </span>
                      <span className="_23portion">
              <span v-if="report.investigation_report.withtyrebrandbl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyrebrandblremarks }}
                      </span>
                      <span className="_23portion">BR
              <span v-if="report.investigation_report.withtyrebrandbr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withtyrebrandbrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Door Handle</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
              <span v-if="report.investigation_report.withdoorhandlefl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withdoorhandleflremarks }}
                      </span>
                      <span className="_23portion">FR
              <span v-if="report.investigation_report.withdoorhandlefr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withdoorhandlefrremarks }}
                      </span>
                      <span className="_23portion">BL
              <span v-if="report.investigation_report.withdoorhandlebl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withdoorhandleblremarks }}
                      </span>
                      <span className="_23portion">BR
              <span v-if="report.investigation_report.withdoorhandlebr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withdoorhandlebrremarks }}
                      </span>
                  </td>
              </tr>
              <tr>
                  <td className="subjclassName">Rim</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
              <span v-if="report.investigation_report.withrimfl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withrimflremarks }}
                      </span>
                      <span className="_23portion">FR
              <span v-if="report.investigation_report.withrimfr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withrimfrremarks }}
                      </span>
                      <span className="_23portion">BL
              <span v-if="report.investigation_report.withrimbl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withrimblremarks }}
                      </span>
                      <span className="_23portion">BR
              <span v-if="report.investigation_report.withrimbr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withrimbrremarks }}
                      </span>
                  </td>
              </tr>
  
              <tr>
                  <td className="subjclassName">Window Glass</td><td colspan=3>:&nbsp;
                      <span className="_23portion">FL
              <span v-if="report.investigation_report.withwindowglassfl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindowglassflremarks }}
                      </span>
                      <span className="_23portion">FR
              <span v-if="report.investigation_report.withwindowglassfr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindowglassfrremarks }}
                      </span>
                      <span className="_23portion">BL
              <span v-if="report.investigation_report.withwindowglassbl">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindowglassblremarks }}
                      </span>
                      <span className="_23portion">BR
              <span v-if="report.investigation_report.withwindowglassbr">&#9745;&nbsp;</span>
              <span v-else>&#9744;&nbsp;</span>
              {{ report.investigation_report.withwindowglassbrremarks }}
                      </span>
                  </td>
              </tr>
  
              <tr>
                  <td className="subjclassName">Remark</td><td colspan="3">:&nbsp;<span className="remarkLine">
                      {{ report.investigation_report.extcomponentremarks }}
                  </span></td>
              </tr>
              </table>
          </div>
      </div>
  <div style="page-break-before: always"></div>
  <div className="billLayout">
          <div className="">
              <div className="bold big ">
              Inspection Report - <span className="medium">{{ report.auction_house.auctionhouse_name }}</span><span className="small">{{ report.auction_house.auctionhouse_address }}</span>
              </div>
  
              <div className="medium bold" style="display:table">
                  <div style="display: table-row;">
                      <div style="display: table-cell;">Reg. No</div>
                      <div style="display: table-cell;">&nbsp;:&nbsp;{{ report.registration_number }}</div>
                  </div>
  
                  <div style="display: table-row;">
                      <div style="display: table-cell;">Model </div>
                      <div style="display: table-cell;">&nbsp;:&nbsp;{{ report.model }}</div>
                  </div>
              </div>
          </div>
          <br>
          <div className="centerContent">
              <div className="sectionHeader">Parts Grade</div>
              <div className="center" style="position: relative;">
              <img src="https://e-biddi.com/web/images/Processed_Vehicle_Parts.png" style ="width:780px">
              <div v-for="(location, index) in locations" :key="index">
                <div style="">
                  {{ location.name }}
                </div>
              </div>
  
              </div>
              <p className="underline">Grading Remark</p>
              <p className="medium">
                  <ul>
                      <li>S - Scratched</li>
                      <li>C - Cracked</li>
                      <li>D - Dented</li>
                      <li>R - Rusty</li>
                      <li>B - Broken</li>
                      <li>G - Gap</li>
                      <li>F - Fair</li>
                      <li>GD - Good</li>
  
  
                  </ul>
              </p>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        report: {},
        locations: [],
      };
    },
    mounted() {
      this.loadReport();
    },
    methods: {
      loadReport() {
        const url = `${process.env.VUE_APP_API_URL}/item/${this.$route.params.id}`;
        this.$http
          .get(url)
          .then((response) => {
            this.report = response.data.data;
            this.locations = [
              {
                name: this.report.investigation_report.vehiclepartsgrade1,
                left: 636,
                top: 304,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade2,
                left: 635,
                top: 232,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade3,
                left: 636,
                top: 166,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade4,
                left: 656,
                top: 320,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade5,
                left: 678,
                top: 219,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade6,
                left: 663,
                top: 148,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade7,
                left: 664,
                top: 238,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade8,
                left: 570,
                top: 232,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade9,
                left: 595,
                top: 412,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade10,
                left: 593,
                top: 61,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade11,
                left: 498,
                top: 372,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade12,
                left: 504,
                top: 92,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade13,
                left: 464,
                top: 233,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade14,
                left: 443,
                top: 123,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade15,
                left: 395,
                top: 78,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade16,
                left: 382,
                top: 139,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade17,
                left: 342,
                top: 28,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade18,
                left: 293,
                top: 78,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade19,
                left: 298,
                top: 141,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade20,
                left: 229,
                top: 133,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade21,
                left: 178,
                top: 103,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade22,
                left: 145,
                top: 61,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade23,
                left: 64,
                top: 240,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade24,
                left: 90,
                top: 236,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade25,
                left: 135,
                top: 232,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade26,
                left: 183,
                top: 231,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade27,
                left: 108,
                top: 314,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade28,
                left: 107,
                top: 154,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade29,
                left: 154,
                top: 404,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade30,
                left: 188,
                top: 372,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade31,
                left: 228,
                top: 337,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade32,
                left: 293,
                top: 324,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade33,
                left: 297,
                top: 383,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade34,
                left: 349,
                top: 430,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade35,
                left: 400,
                top: 385,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade36,
                left: 387,
                top: 334,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade37,
                left: 442,
                top: 345,
              },
              {
                name: this.report.investigation_report.vehiclepartsgrade38,
                left: 301,
                top: 233,
              },
            ];
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
  <style>
  .billLayout {
    width: 800px;
    height: 1165px;
    position: relative;
  }
  .topLeft {
    position: absolute;
    top: 0;
    left: 0px;
    margin-top: 5px;
    margin-left: 5px;
  }
  .topRight {
    position: absolute;
    top: 0;
    right: 0px;
    margin-top: 5px;
    margin-right: 5px;
  }
  .centerContent {
    position: relative;
    margin: auto;
    width: 98%;
    height: 1100px;
  }
  .billName {
    text-align: center;
    margin: auto;
    width: 150px;
    top: 40px;
  }
  .centerTable {
    position: absolute;
    left: 20%;
    margin: auto;
    width: 60%;
  }
  .bottomLeft {
    position: absolute;
    bottom: 0;
    left: 0px;
    margin-bottom: 20px;
    margin-left: 5px;
    height: 150px;
    width: 40%;
  }
  .bottomRight {
    position: absolute;
    bottom: 0;
    right: 0px;
    margin-bottom: 20px;
    margin-right: 5px;
    height: 150px;
    width: 40%;
  }
  .tablerow {
    display: table-row;
    margin: auto;
  }
  .leftcell {
    display: table-cell;
  }
  .rightcell {
    display: table-cell;
  }
  .signature {
    width: 100%;
    position: absolute;
    bottom: 5px;
  }
  .small {
    font-size: 10px;
  }
  .medium {
    font-size: 15px;
  }
  .big {
    font-size: 22px;
  }
  .bold {
    font-weight: bold;
  }
  .center {
    text-align: center;
  }
  .underline {
    text-decoration: underline;
  }
  .varField {
    font-weight: bold;
    display: inline-block;
    width: 80%;
    border-bottom: 1px solid black;
    padding-left: 1;
  }
  ._23portion {
    font-weight: bold;
    display: inline-block;
    width: 23%;
    border-bottom: 1px solid black;
    padding-left: 1;
  }
  ._30portion {
    font-weight: bold;
    display: inline-block;
    width: 30%;
    border-bottom: 1px solid black;
    padding-left: 1;
  }
  ._44portion {
    font-weight: bold;
    display: inline-block;
    width: 44%;
    border-bottom: 1px solid black;
    padding-left: 1;
  }
  .remarkLine {
    font-weight: bold;
    display: inline-block;
    width: 85%;
    border-bottom: 1px solid black;
    padding-left: 1;
  }
  .contentTable {
    margin: auto;
    border-spacing: 0px;
    border-collapse: collapse;
  }
  .contentTable td {
    border: 1px solid black;
    border-spacing: 0px;
    padding: 2px;
  }
  .varCell {
    width: 120px;
    text-align: right;
  }
  .labelCell {
    width: 200px;
  }
  .sectionHeader {
    width: 100%;
    border-bottom: 1px solid black;
    font-weight: bold;
    font-size: 13px;
  }
  p {
    font-size: 17px;
  }
  td {
    font-size: 11.5px;
  }
  </style>
  
  
  
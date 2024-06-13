<template>
    <div class="text-left">
      <div class="billLayout">
        <table
          class="outerTable"
          style="width: 100%; border-spacing: 0px; border-collapse: collapse"
        >
          <tr>
            <td style="width: 80px"></td>
            <td style="width: 220px"></td>
            <td style="width: 80px"></td>
            <td style="width: 170px"></td>
            <td style="width: 50px"></td>
            <td style="width: 200px"></td>
          </tr>
          <tr>
            <td colspan="6" class="big bold">
              <div>
                <span class="medium"
                  >INSPECTION REPORT -- {{ report.companyname }}
                </span>
                <span class="small">{{ report.companyaddress }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="6">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="6" class="b1blkbtm">VEHICLE INFORMATION</td>
          </tr>
          <tr>
            <td colspan="6">&nbsp;</td>
          </tr>
  
          <tr>
            <td class="small">Panel</td>
            <td class="small b1blkbtm">{{ report.bankername }}</td>
            <td class="small">Presentation</td>
            <td class="b1blkbtm small">
              :
              <span
                v-html="showDriveTow(report.investigation_report.drivetow)"
              ></span>
            </td>
            <td class="small">Mode</td>
            <td class="b1blkbtm small">
              :
              <span
                v-html="
                  repossedMethod(report.investigation_report.repossesedmethod)
                "
              ></span>
            </td>
          </tr>
  
          <tr>
            <td class="small">Branch</td>
            <td class="b1blkbtm small">
              : {{ report.investigation_report.branch }}
            </td>
            <td class="small">Date In</td>
            <td class="b1blkbtm small">
              : {{ report.investigation_report.reposseseddate | moment('d.m.Y') }}
            </td>
            <td class="small">Time In</td>
            <td class="b1blkbtm small">
              : <span v-html="report.investigation_report.timein"></span>
            </td>
          </tr>
          <tr>
            <td class="small">Model</td>
            <td class="b1blkbtm small">: <span v-html="report.model"></span></td>
            <td class="small">Mileage</td>
            <td class="b1blkbtm small">
              : <span v-html="report.investigation_report.mileage"></span>
            </td>
            <td class="small">Key</td>
            <td class="b1blkbtm small">
              :
              <span
                v-html="showValue(report.investigation_report.withkeyremarks)"
              ></span>
            </td>
          </tr>
          <tr>
            <td class="small">Reg No.</td>
            <td class="b1blkbtm small">
              : {{ report.investigation_report.registrationnumber }}
            </td>
            <td class="small">Road Tax</td>
            <td class="b1blkbtm small">
              :
              <span
                v-html="showValue(report.investigation_report.withroadtax)"
              ></span>
            </td>
            <td class="small">Remote</td>
            <td class="b1blkbtm small">
              :
              <span
                v-html="showValue(report.investigation_report.withremoteremarks)"
              ></span>
            </td>
          </tr>
          <tr>
            <td class="small">Engine No.</td>
            <td class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.engineno }}
            </td>
            <td class="small">Chassis No.</td>
            <td colspan="3" class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.chasisno }}
            </td>
          </tr>
          <tr>
            <td class="small">RO Engine No.</td>
            <td class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.roenginenumber }}
            </td>
            <td class="small">RO Chassis No.</td>
            <td colspan="3" class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.rochasisno }}
            </td>
          </tr>
          <tr>
            <td class="small">Transmission</td>
            <td class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.transmission }}
            </td>
            <td class="small">General Condition</td>
            <td colspan="3" class="b1blkbtm small">
              :&nbsp;{{ report.investigation_report.generalcondition }}
            </td>
          </tr>
          <tr>
            <td colspan="6">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="6">
              <div style="width: 48%; float: left">
                <table
                  style="
                    width: 100%;
                    border-spacing: 0px;
                    border-collapse: collapse;
                  "
                  class="b1blk"
                >
                  <tr>
                    <td class="b1blk center small" style="width: 20px">No</td>
                    <td class="b1blk center small" style="width: 180px">Items</td>
                    <td class="b1blk center small" style="width: 65px">
                      Condition
                    </td>
                    <td class="b1blk center small" style="width: 220px">
                      Remarks
                    </td>
                  </tr>
                  <tr v-for="(item, index) in rformvalueArray" :key="index">
                    <td class="b1blk center small">{{ index + 1 }}</td>
                    <td class="b1blk small"><span v-html="item.title"></span></td>
                    <td class="b1blk center">{{ showGrade(item.data) }}</td>
                    <td class="b1blk small">{{ item.remarks }}</td>
                  </tr>
                </table>
              </div>
              <div style="width: 4%; float: left">&nbsp;</div>
              <div style="width: 48%; float: left">
                <table
                  style="
                    width: 100%;
                    border-spacing: 0px;
                    border-collapse: collapse;
                  "
                  class="b1blk"
                >
                  <tr>
                    <td class="b1blk center small" style="width: 20px">No</td>
                    <td class="b1blk center small" style="width: 180px">Items</td>
                    <td class="b1blk center small" style="width: 65px">
                      Condition
                    </td>
                    <td class="b1blk center small" style="width: 220px">
                      Remarks
                    </td>
                  </tr>
                  <tr v-for="(item, index) in lformvalueArray" :key="index">
                    <td class="b1blk center small">{{ index + 1 }}</td>
                    <td class="b1blk small">&nbsp;{{ item.title }}</td>
                    <td class="b1blk center">{{ showGrade(item.data) }}</td>
                    <td class="b1blk small">{{ item.remarks }}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
  
          <tr>
            <td colspan="6">&nbsp;</td>
          </tr>
  
          <tr>
            <td colspan="6">
              <table
                style="
                  width: 100%;
                  border-spacing: 0px;
                  border-collapse: collapse;
                "
                class="b1blk"
              >
                <tr>
                  <td class="b1blk vtop small" style="width: 120px; height: 60px">
                    Remarks :
                  </td>
                  <td class="b1blk vtop small">
                    {{ report.extcomponentremarks }}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr>
            <td colspan="6">&nbsp;</td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        report: {},
        rformvalueArray: [],
        lformvalueArray: [],
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
            this.processList();
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      processList() {
        this.formvalueArray = [];
  
        const report = this.report.investigation_report;
  
        console.log(report);
  
        this.rformvalueArray.push({ title: 'ENGINE', data: report.withengine, remark: report.withengineremarks });
        this.rformvalueArray.push({ title: 'COVER', data: report.withbodycover, remark: report.withbodycoverremarks });
        this.rformvalueArray.push({ title: 'BATTERY', data: report.withbattery, remark: report.withbatteryremarks });
        this.rformvalueArray.push({ title: 'CARBURETOR/INJECTION', data: report.withcarburetor, remark: report.withcarburetorremarks });
        this.rformvalueArray.push({ title: 'SPEEDO METER', data: report.withspeedometer, remark: report.withspeedometerremarks });
        this.rformvalueArray.push({ title: 'CHAIN & SPROCKET', data: report.withchainsprocket, remark: report.withchainsprocketremarks });
        this.rformvalueArray.push({ title: 'CHAIN COVER', data: report.withbodycover, remark: report.withbodycoverremarks });
        this.rformvalueArray.push({ title: 'ORDINARY RIM (FRONT)', data: report.withordinaryrimf, remark: report.withordinaryrimfremarks });
        this.rformvalueArray.push({ title: 'ORDINARY RIM (REAR)', data: report.withordinaryrimr, remark: report.withordinaryrimrremarks });
        this.rformvalueArray.push({ title: 'SPORT RIM (FRONT)', data: report.withsportrimf, remark: report.withsportrimfremarks });
        this.rformvalueArray.push({ title: 'SPORT RIM (REAR)', data: report.withsportrimr, remark: report.withsportrimrremarks });
        this.rformvalueArray.push({ title: 'EXHAUST PIPE', data: report.withexhaustpipe, remark: report.withexhaustpiperemarks });
        this.rformvalueArray.push({ title: 'STAND (SINGLE)', data: report.withstandsingle, remark: report.withstandsingleremarks });
        this.rformvalueArray.push({ title: 'STAND (DOUBLE)', data: report.withstanddouble, remark: report.withstanddoubleremarks });
        this.rformvalueArray.push({ title: 'GEAR PEDAL', data: report.withgearpedal, remark: report.withgearpedalremarks });
        this.rformvalueArray.push({ title: 'PEDAL STAND (FRONT LEFT)', data: report.withpedalstandfl, remark: report.withpedalstandflremarks });
        this.rformvalueArray.push({ title: 'PEDAL STAND (FRONT RIGHT)', data: report.withpedalstandfr, remark: report.withpedalstandfrremarks });
        this.rformvalueArray.push({ title: 'PEDAL STAND (REAR LEFT)', data: report.withpedalstandrl, remark: report.withpedalstandrlremarks });
        this.rformvalueArray.push({ title: 'PEDAL STAND (REAR RIGHT)', data: report.withpedalstandrr, remark: report.withpedalstandrrremarks });
        this.rformvalueArray.push({ title: 'BRAKE PEDAL (FRONT WHEEL)', data: report.withbrakepedalf, remark: report.withbrakepedalfremarks });
        this.rformvalueArray.push({ title: 'BRAKE PEDAL (REAR WHEEL)', data: report.withbrakepedalr, remark: report.withbrakepedalrremarks });
        this.rformvalueArray.push({ title: 'CLUTCH PEDAL (FRONT)', data: report.withclutchpedalf, remark: report.withclutchpedalfremarks });
        this.rformvalueArray.push({ title: 'STARTER PEDAL', data: report.withstarterpedal, remark: report.withstarterpedalremarks });
        this.rformvalueArray.push({ title: 'REAR MONOSHOCK', data: report.withrearmonoshock, remark: report.withrearmonoshockremarks });
        this.rformvalueArray.push({ title: 'REAR ABSORBER (LEFT)', data: report.withrearabsorberl, remark: report.withrearabsorberlremarks });
        this.rformvalueArray.push({ title: 'REAR ABSORBER (RIGHT)', data: report.withrearabsorberr, remark: report.withrearabsorberrremarks });
        this.lformvalueArray.push({ title: 'FRONT FORK (LEFT)', data: report.withfrontforkl, remark: report.withfrontforklremarks });
        this.lformvalueArray.push({ title: 'FRONT FORK (RIGHT)', data: report.withfrontforkr, remark: report.withfrontforkrremarks });
        this.lformvalueArray.push({ title: 'SEAT', data: report.withmaybankseat, remark: report.withmaybankseatremarks });
        this.lformvalueArray.push({ title: 'REAR HANDLE', data: report.withrearhandle, remark: report.withrearhandleremarks });
        this.lformvalueArray.push({ title: 'IGNITION KEY SWITCH', data: report.withignitionkeyswitch, remark: report.withignitionkeyswitchremarks });
        this.lformvalueArray.push({ title: 'KEY SWITCH FOR SEAT', data: report.withkeyswitchforseat, remark: report.withkeyswitchforseatremarks });
        this.lformvalueArray.push({ title: 'SIDE MIRROR (LEFT)', data: report.withsidemirrorl, remark: report.withsidemirrorlremarks });
        this.lformvalueArray.push({ title: 'SIDE MIRROR (RIGHT)', data: report.withsidemirrorr, remark: report.withsidemirrorrremarks });
        this.lformvalueArray.push({ title: 'BASKET (FRONT)', data: report.withbasketf, remark: report.withbasketfremarks });
        this.lformvalueArray.push({ title: 'STORAGE BOX (REAR)', data: report.withstorageboxr, remark: report.withstorageboxrremarks });
        this.lformvalueArray.push({ title: 'BRAKE (FRONT)', data: report.withdiscbrakef, remark: report.withdiscbrakefremarks });
        this.lformvalueArray.push({ title: 'BRAKE (REAR)', data: report.withdiscbraker, remark: report.withdiscbrakerremarks });
        this.lformvalueArray.push({ title: 'MUD GUARD (FRONT)', data: report.withmudguardf, remark: report.withmudguardfremarks });
        this.lformvalueArray.push({ title: 'MUD GUARD (REAR)', data: report.withmudguardr, remark: report.withmudguardrremarks });
        this.lformvalueArray.push({ title: 'TYRE (FRONT)', data: report.withtyref, remark: report.withtyrefremarks });
        this.lformvalueArray.push({ title: 'TYRE (REAR)', data: report.withtyrer, remark: report.withtyrerremarks });
        this.lformvalueArray.push({ title: 'PLATE NUMBER (FRONT)', data: report.withnumberplatef, remark: report.withnumberplatefremarks });
        this.lformvalueArray.push({ title: 'PLATE NUMBER (REAR)', data: report.withnumberplateb, remark: report.withnumberplatebremarks });
        this.lformvalueArray.push({ title: 'REAR LAMP', data: report.withtaillampl, remark: report.withtaillamplremarks });
        this.lformvalueArray.push({ title: 'HEAD LAMP', data: report.withmaybankheadlamp, remark: report.withmaybankheadlampremarks });
        this.lformvalueArray.push({ title: 'BRAKE LIGHT', data: report.with3rdbreaklight, remark: report.with3rdbreaklightremarks });
        this.lformvalueArray.push({ title: 'FRONT SIGNAL (LEFT)', data: report.withfrontsignall, remark: report.withfrontsignallremarks });
        this.lformvalueArray.push({ title: 'FRONT SIGNAL (RIGHT)', data: report.withfrontsignalr, remark: report.withfrontsignalrremarks });
        this.lformvalueArray.push({ title: 'REAR SIGNAL (LEFT)', data: report.withtailsignall, remark: report.withtailsignallremarks });
        this.lformvalueArray.push({ title: 'REAR SIGNAL (RIGHT)', data: report.withtailsignalr, remark: report.withtailsignalrremarks });
      },
  
      repossedMethod(val) {
        switch (val) {
          case 1: return 'Repossesed'; break;
          case 2: return 'Surrender'; break;
          case 3: return 'Relocated'; break;
          case 4: return 'Return'; break;
          case 5: return 'Others'; break;
        }
      },
  
      showValue(val) {
        if (val) {
          return `&#9745;&nbsp;${val}`;
        }
        return `&#9744;&nbsp;${val}`;
      },
  
      showGrade(val) {
        switch (val) {
          case 0: return 'Fair';
          case 1: return 'Good';
          case 2: return 'Bad';
        }
      },
  
      showDriveTow(val) {
        switch (val) {
          case 1: return 'Towing'; break;
          case 2: return 'Drive In'; break;
        }
      },
  
    },
  };
  </script>
  

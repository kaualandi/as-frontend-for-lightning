/* eslint-disable no-useless-return */
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IChannel, IEquipment } from "src/app/models/equipment";
import { IMonitoring, IMonitoringSocket } from "src/app/models/monitoring";

@Injectable({
  providedIn: "root"
})
export class ConfigMonitoringChannelService {
  configChannels: any = {
    default: { name: "", color: "#62ff", hertz: 500, secs: 9, variable: "x" },
    ecg_i: {
      name: "I",
      color: "#62fe34",
      hertz: 256,
      secs: 8
    },
    ecg_ii: {
      name: "II",
      color: "#62fe34",
      hertz: 256,
      secs: 8
    },
    ecg_iii: {
      name: "III",
      color: "#62fe34",
      hertz: 256,
      secs: 8
    },
    plenth: {
      name: "plenth",
      color: "#00deff",
      hertz: 100,
      secs: 15
    },
    resp: {
      name: "RESP",
      color: "#FFCC00",
      hertz: 50,
      secs: 20
    },
    NOM_ECG_ELEC_POTL_I: {
      name: "I",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    NOM_ECG_ELEC_POTL_II: {
      name: "II",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    NOM_ECG_ELEC_POTL_III: {
      name: "III",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    MDC_ECG_ELEC_POTL_I: {
      name: "I",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    MDC_ECG_ELEC_POTL_II: {
      name: "II",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    MDC_ECG_ELEC_POTL_III: {
      name: "III",
      color: "#62fe34",
      hertz: 500 * 1,
      secs: 5
    },
    NOM_PLETH: {
      name: "PLETH",
      color: "#00deff",
      hertz: 127.8 * 1,
      secs: 5
    },
    NOM_RESP: {
      name: "RESP",
      color: "#FFCC00",
      hertz: 127.8 * 2,
      secs: 5
    },
    NOM_ECG_ELEC_POTL_AVR: {
      name: "AVR",
      color: "#62fe34",
      hertz: 500,
      secs: 5
    },
    NOM_ECG_ELEC_POTL_AVL: {
      name: "AVL",
      color: "#62fe34",
      hertz: 500,
      secs: 5
    }
  };

  timeRefresh = 15;
  curves: any[] = [];
  list_socket: any[] = [];

  // #region - VARIABLES O RECIEVE SOCKET
  public startCurves = false;
  public startContent: { name: string; data: number[] }[] = [];
  public socket: any;
  public _conected = false;
  public intervalID: any;
  public clearShart = false;
  public previewJson = null;
  public contentRest = 0;
  public checkCurve: any[] = [] 


  public limitTime = 20 * 1000; // segundos
  public timer: any;

  private _activeCurves = new BehaviorSubject<
    { name: string; data: number[] }[]
  >([]);

  readonly activeCurves = this._activeCurves.asObservable();

  // #endregion

  private SocketSubject = new Subject<void>();

  watchSocket() {
    return this.SocketSubject.asObservable();
  }

  unwatchSocket() {
    this.SocketSubject.unsubscribe();
  }

  changeSocket(res: any): void {

    this.checkCurve = res

    this.setCurves(res);
    setTimeout(() => {
      this.SocketSubject.next(res);
    }, 10);
    
  } // chave do socket.onmessage

  checkEventRequest() {
    console.log(
      "Tempo limite atingido. Nenhuma mensagem recebida em 1 minuto."
    );
    this.clearShart = true;
    // Código a ser executado quando o tempo limite é atingido
  }

  orderListSo(list: any[]) {
    return list.sort((a, b) => {
      const auxA = new Date(a.end_date).getTime();
      const auxB = new Date(b.end_date).getTime();

      if (auxA < auxB) {
        return -1;
      }
      if (auxA > auxB) {
        return 1;
      }
      return 0;
    });
  }

  setCurves(curve: IMonitoringSocket) {
    const existingIndex = this.curves.findIndex(
      (item: { equipment: number }) => item.equipment === curve.equipment
    );

    if (existingIndex === -1) {
      // console.log("PRIMEIRO IF DO SETCURVES")
      this.curves.push({
        equipment: curve.equipment,
        waves: this.separateObjectFromArray(curve.waves),
        end_date: curve.end_date,
        start_date: curve.start_date
      });
    } else {
      // this.curves[existingIndex].waves = this.separateObjectFromArray(
      //   curve.waves
      // );
      this.separateObjectFromArray(curve.waves);
      this.activeCurves.subscribe((data) => {
        this.curves[existingIndex].waves = data;
      });
      // this.curves[existingIndex].waves =
      this.curves[existingIndex].end_date = curve.end_date;
      this.curves[existingIndex].start_date = curve.start_date;
    }
  }

  separateObjectFromArray(waves: any) {
    const listWaves: { name: string; data: number[] }[] = [];
    const aux = Object.entries(waves);

    aux.forEach((wave: any) => {
      listWaves.push({ name: wave[0], data: wave[1] });
    });

    if (!this.startCurves) {
      listWaves.forEach((wv: any) => {
        // Verifiquei se já existe um objeto com o mesmo nome na lista
        const existingCurve = this.startContent.find(
          (curve: any) => curve.name === wv.name
        );

        if (existingCurve) {
          // console.log(existingCurve.name,'==> ', existingCurve.data.length)
          // Se o objeto já existe, adicionei os novos dados ao array existente
          if(existingCurve.data.concat(wv.data).length > 20000){
            
            if(existingCurve.name === "resp"){
              for(let i=0; i<600; i++){
                existingCurve.data.concat(wv.data).shift()
              }
              // console.log(existingCurve.name,'==> ', existingCurve.data.length)
            }else{
              for(let i=0; i<1280; i++){
                existingCurve.data.concat(wv.data).shift()
              }
              // console.log(existingCurve.name,'==> ', existingCurve.data.length)
            }
          }else{
            existingCurve.data = existingCurve.data.concat(wv.data);
          }

        } else {
          // Se o objeto não existe, adicionei à lista
          this.startContent.push({ ...wv });
          this._activeCurves.next(this.startContent);
        }
      });
    }
    //  return this.startContent;
    return listWaves;
  }

  getCurveById(equipmentId: number) {
    const curve = this.curves.find(
      (item: { equipment: number }) => item.equipment === equipmentId
    );
    return curve || null;
  }

  /**
   * ### Tratamento da lista de monitores
   * Espera receber uma lista de monitores, onde faz uma limpeza dos q não tem equipamento.
   * Uma variavel como tempo para setar como offline.
   *
   * O Content-Type será automático com base no tipo de seu body
   *
   * @param data lista dos monitores
   * @param minute minuto para setar como offline / 0 para tirar esse tratamento
   * @returns Retorna a lista com todo o tratamento
   */
  changeMonitorStatusToOffline(data: IMonitoring[], minute = 5) {
    const monitorings = data.filter(
      (el: IMonitoring) => el.equipment.length > 0
    );

    const array = monitorings.map((el: any) => {
      el.equipment.map((equipment: IEquipment) => {
        const startTime = new Date(equipment.last_read_at);
        const currentTime = new Date();

        const MILLISECONDS_PER_MINUTE = 60 * 1000;
        const differenceInMinutes = Math.floor(
          (currentTime.getTime() - startTime.getTime()) /
            MILLISECONDS_PER_MINUTE
        );

        if (minute > 0 && equipment) {
          if (differenceInMinutes >= minute) {
            equipment.status = "OFFLINE";
          }
        }
        return el;
      });

      return {
        ...el
      };
    });
    return array;
  }

  /**
   * ### Ordenação por ID da lista
   *
   *
   * @param list lista
   * @returns Retorna a lista ordenada.
   */
  orderHaveCurves(list: any[]) {
    const haveCurves = list.filter((item) => item.haveCurves === true);
    const dontHaveCurves = list.filter((item) => item.haveCurves === false);
    return haveCurves.concat(dontHaveCurves);
  }

  /**
   * ### Ordenação por ID da lista
   *
   *
   * @param list lista
   * @returns Retorna a lista ordenada.
   */
  orderList(list: any[]) {
    return list.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * ### Ordenação por ID da lista
   *
   *
   * @param list lista
   * @returns Retorna a lista ordenada.
   */
  orderMonitorOnline(list: IMonitoring[]) {
    return list.sort((a, b) => {
      const statusA = ["ONLINE", "ALARMANDO"].includes(
        a.equipment[0].status?.toUpperCase()
      );
      const statusB = ["ONLINE", "ALARMANDO"].includes(
        b.equipment[0].status?.toUpperCase()
      );

      if (statusA && !statusB) {
        return -1;
      }
      if (!statusA && statusB) {
        return 1;
      }

      // Se ambos os itens têm o mesmo status ou nenhum deles é "Online",
      // então ordenamos por ID.
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }

      return 0;
    });
  }

  /**
   * ### Configuração dos canais
   *
   *
   * @param channel nome do canal
   * @returns Retorna o nome, cor, o hertz e o secs referente de cada canal.
   */
  setConfigChannel(channel: string) {
    if (this.configChannels[channel]) {
      return this.configChannels[channel];
    } else {
      return this.configChannels.default;
    }
  }

  /**
   * ### Configuração dos canais
   *
   *
   * @param arr array de numeros
   * @returns Retorna o valor do meio das curvas.
   */
  findMostRepeatedNumber(arr: number[]): number | undefined {
    if (arr.length === 0) {
      return undefined;
    }

    const min = Math.min(...arr);
    const max = Math.max(...arr);

    return (min + max) / 2 || 0;
  }

  /**
   * ### Configuração dos canais
   *
   *
   * @param channels array dos canais
   * @param limit numero limite de itens no array q ira retornar
   * @param status o status do equipamento
   * @returns Retorna um array de params com as config do Canal.
   */
  setArrayParams(channels: IChannel[], limit: number): any[] {
    const listChannels: IChannel[] = Object.assign([], [...channels]);

    const listOrder: any[] = [];
    const listOthers: any[] = [];
    // const order = ["FC", "SpO2", "FR", "T1", "PNI", "PNI"];

    const arrayPI = listChannels.filter((el) => el.channel === "PI");
    const arrayPNI = listChannels.filter((el) => el.channel === "PNI");
    const arrayST = listChannels.filter((el) => el.label && el.label.includes("ST_")
    
    );
    // console.log(arrayST);

    const array = listChannels.filter(
      (el) => !["PI", "PNI"].includes(el.channel)
    );

    const arrayAux = array.filter(
      (el) => el.label && el.label.indexOf("ST_") === -1
    );

    if (arrayST && arrayST.length > 0) {
      const objPI: any = Object.assign([], arrayST[0]);
      objPI.valueNew = this.setStyleValueST(arrayST);
      objPI.label = "ST";
      objPI.name = "ST";
      objPI.alarm = null;
      arrayAux.push(objPI);
    }

    if (arrayPI && arrayPI.length > 0) {
      const objPI: any = Object.assign([], arrayPI[0]);
      objPI.valueNew = this.setStyleValue(arrayPI);
      objPI.label = "PI";
      objPI.name = "PI";
      arrayAux.push(objPI);
    }

    if (arrayPNI && arrayPNI.length > 0) {
      const objPNI: any = Object.assign([], arrayPNI[0]);
      objPNI.valueNew = this.setStyleValue(arrayPNI);
      objPNI.label = "PNI";
      objPNI.name = "PNI";
      arrayAux.push(objPNI);
    }

    arrayAux.forEach((ch) => {
      listOthers.push(ch);
      if (!["PI", "PNI"].includes(ch.channel)) {
        ch.value = Number(ch.value.toFixed(1));
        ch.size = "";
      } else {
        ch.size = "big";
      }
    });

    // if(array.length > 0){
    //   arrayAux = arrayAux.concat(array);
    // }

    // if(arrayAux.length === 0){
    //   arrayAux = array;
    // }

    const foundItems = new Set();

    // arrayAux = this.mergeArrays(arrayAux, array)

    arrayAux.forEach((channel) => {
      if (!foundItems.has(channel.label)) {
        listOrder.push(channel);
        foundItems.add(channel.label);
      }
    });

    let ListOrder = arrayAux.filter((el: any) => el.is_active);
    // console.log('\n',ListOrder.length,'-->',ListOrder);

    if (ListOrder.length > limit && limit > 0) {
      ListOrder = ListOrder.splice(limit, ListOrder.length);
    }

    // console.log(limit,'->',ListOrder, '\n');
    
    return this.orderToOrderChannel(ListOrder);
  }

  mergeArrays(array1: any[], array2: any[]): any[] {
    // Cria uma cópia dos arrays originais para evitar modificar os arrays originais
    const result = [...array1];

    // Itera sobre os itens do segundo array
    for (const item of array2) {
        // Verifica se o item não está presente no array resultante
        if (!result.includes(item)) {
            // Adiciona o item ao array resultante
            result.push(item);
        }
    }

    return result;
}

  orderToOrderChannel(list: any[]) {
    return list.sort((a, b) => {
      if (a.channel_order < b.channel_order) {
        return -1;
      }
      if (a.channel_order > b.channel_order) {
        return 1;
      }
      return 0;
    });
  }

  setStyleValue(ch: IChannel[]) {
    const SIST = ch.filter((el: any) => el.name.toUpperCase().includes("SIST"));
    const DIAS = ch.filter((el: any) => el.name.toUpperCase().includes("DIAS"));
    const MED = ch.filter((el: any) => el.name.toUpperCase().includes("MED"));

    const SistValue =
      SIST.length > 0 && this.isNumber(SIST[0]?.value)
        ? SIST[0]?.value.toFixed(0)
        : 0;

    const DiasValue =
      DIAS.length > 0 && this.isNumber(DIAS[0]?.value)
        ? DIAS[0]?.value.toFixed(0)
        : 0;

    const MedValue =
      MED.length > 0 && this.isNumber(MED[0]?.value)
        ? MED[0]?.value.toFixed(0)
        : 0;

    return `${SistValue || 0}/${DiasValue || 0}<span class='text_med'>(${
      MedValue || 0
    })</span>`;
  }

  setStyleValueST(ch: IChannel[]) {

    let string = "<div class='grid-st'>";

    ch.forEach((el) => {
      string += `
      <div class='card-value'>
        <h4 class='title-st'>
          ${el.label.replace("ST_", "")}
          </h4>
          <h4 class='value-st'>
          ${el.value}
        </h4>
      </div>
      `;
    });

    return (
      string +
      `
    </div>`
    );
  }

  isNumber(variable: any) {
    return typeof variable === "number";
  }
}

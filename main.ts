namespace modules {
    /**
    * The state of the Seeed Grove Relay
    */
    //% fixedInstance whenUsed block="Seeed Grove relay"
    export const groveRelayState = new RelayClient("Grove Relay C16(A1)?dev=self")

}
namespace servers {
    function start() {
        jacdac.productIdentifier = 0x35b7e929
        jacdac.deviceDescription = "Grove Relay C16"
        jacdac.startSelfServers(() => {

            const servers: jacdac.Server[] =
                [DigitalPin.C16]
                    .map((pin, i) => {
                        pins.digitalWritePin(pin, 0)
                        return jacdac.createActuatorServer(jacdac.SRV_RELAY, server => {
                            const active = server.intensity > 0 ? 1 : 0
                            pins.digitalWritePin(pin, active)
                        }, {
                            intensityPackFormat: jacdac.RelayRegPack.Active,
                            instanceName: `COM${i + 1}`,
                            variant: jacdac.RelayVariant.Electromechanical
                        })
                    })
            return servers
        })
    }
    start()
}
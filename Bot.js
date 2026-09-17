const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'brawl.stars.bodrio',
        port: 67676,
        username: 'Raboot_356',
        version: true
    });

    bot.on('spawn', () => {
        console.log(`[NPC] El bot ha aparecido correctamente en el mapa.`);
        setTimeout(() => bot.chat('/login erickJKN'), 4000);
    });

    bot.on('login', () => {
        console.log(`[NPC] Conexi贸n establecida con el servidor de Minecraft.`);
    });
  
    setInterval(async () => {
        if (!bot || !bot.entity) return;

        try {
            const chestBlock = bot.findBlock({
                matching: bot.registry.blocksByName.chest.id,
                maxDistance: 5
            });
            if (chestBlock) {
                console.log('[NPC] Interactuando con el contenedor cercano...');
                const chest = await bot.openChest(chestBlock);
                console.log('[NPC] Contenedor abierto.');
                await new Promise(resolve => setTimeout(resolve, 2000));
                chest.close();
              
                console.log('[NPC] Contenedor cerrado.');
            } else {
                console.log('[NPC] Aviso: No se detect贸 ning煤n contenedor v谩lido cerca.');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            console.log('[NPC] Acci贸n anti-inactividad completada con 茅xito.');
        } catch (err) {
            console.log(`[NPC] Error en el ciclo de ejecuci贸n: ${err.message}`);
       }
    }, 45000);
    bot.on('end', (reason) => {
        console.log(`[NPC] Conexi贸n finalizada por: ${reason}. Reintentando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });
    bot.on('error', (err) => console.log(`[NPC] Error cr铆tico de red detectado: ${err}`));
}
createBot();

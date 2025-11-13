export default class LevelManager {
    constructor(experience) {
        this.experience = experience;
        this.currentLevel = 1;  // Inicias en el nivel 1
        this.totalLevels = 3;   // Total de niveles (ajustado a 3)
        // Definir objetivos de monedas por nivel
        this.pointsToComplete = {
            1: 2, // por defecto (puedes ajustarlo si quieres)
            2: 5,
            3: 3
        };
    }

    nextLevel() {
        if (this.currentLevel < this.totalLevels) {
            this.currentLevel++;
    
            this.experience.world.clearCurrentScene();
            this.experience.world.loadLevel(this.currentLevel);
    
            // Espera breve para que el nivel se cargue y luego reubicar al robot
            setTimeout(() => {
                // Coordenadas específicas para cada nivel
                const spawnPoints = {
                    2: { x: -15, y: 1.5, z: -63 }, // Nivel 2 - cerca de las monedas
                    3: { x: 1, y: 1.5, z: -1 }     // Nivel 3 - coordenadas ya configuradas
                };
                
                const spawnPoint = spawnPoints[this.currentLevel] || { x: 0, y: 1.5, z: 0 };
                this.experience.world.resetRobotPosition(spawnPoint);
            }, 1000)
        }
    }
    

    resetLevel() {
        this.currentLevel = 1;
        this.experience.world.loadLevel(this.currentLevel);
    }


    getCurrentLevelTargetPoints() {
        return this.pointsToComplete?.[this.currentLevel] ?? 2;
    }
    
}

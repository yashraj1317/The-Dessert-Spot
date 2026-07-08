// ===== CONTROLLED PROBABILITY FUNCTION =====
function getControlledIndex(){

  // Generate number 1–20
  const chance = Math.floor(Math.random() * 20) + 1;

  // Rare rewards (1 in 20)
  if(chance === 1){
      // randomly choose between 15% OFF or Free Bowl
      const rareOptions = [4,5]; // index 4 = bowl, 5 = 15%
      return rareOptions[Math.floor(Math.random()*rareOptions.length)];
  }

  // Normal rewards (19 out of 20)
  const normalOptions = [0,1,2,3]; 
  // 0 = 5%
  // 1 = 10%
  // 2 = Better Luck
  // 3 = Extra Toppings

  return normalOptions[Math.floor(Math.random()*normalOptions.length)];
}
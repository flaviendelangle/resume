/**
 * Computation of the various attacks to make
 * - No more than 20% of the target's field can be taken per attack
 * - It is impossible to target someone with more than 3 time or less than 0.5 time our field
 * - Each unit in the army can take one unit of field to the target
 *
 * @param  int  attacker_field      Field of the attacker
 * @param  int  target_field        Field of the target
 * @param  int  army_cardinal       Number of units in the army of the attacker
 * @param  int  margin              Amount of field to take (-1 si maximum catch)
 * @param  bool beginning_army      Place the remaining army after the optimization on the first attack
 * @param  bool end_army            Place the remaining army after the optimization on the last attack
 * @return list                     List of the attacks to send
**/

function ComputeAttacks(attacker_field, target_field, army_cardinal, margin, beginning_army, end_army) {
    var attacks = [],
        [attacker_field_2, target_field_2, army_cardinal_2] = [attacker_field, target_field, army_cardinal];

    if(attacker_field <= 2*target_field && target_field <= attacker_field*3)
    {
        if (margin == -1)
        {
            while (attacker_field < Math.floor(target_field*1.4) && army_cardinal >= target_field*0.2)
            {
                valeur = (attacks.length === 0 && beginning_army) ? -2 : Math.floor(target_field * 0.2);
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, valeur);
            }

            margin = Math.floor((target_field*2 - attacker_field)/3);
            if (army_cardinal >= margin)
            {
                if(attacks.length === 0 && beginning_army)
                {
                    [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, -2);
                }
                else
                {
                    [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, margin);
                    if(end_army)
                    {
                        [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, -2);
                    }
                    else if (army_cardinal >= target_field*0.2)
                    {
                        [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, Math.floor(target_field * 0.2));
                    }
                    else
                    {
                        [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, army_cardinal);
                    }
                }
            }
            else if (army_cardinal > 0)
            {
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, army_cardinal);
            }
        }

        else if (margin > 0)
        {
            while (margin > target_field*0.2 && attacker_field < Math.floor(target_field*1.4) && army_cardinal >= target_field*0.2)
            {
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, Math.floor(target_field * 0.2));
            }

            if (margin > target_field*0.36)
            {
                return ComputeAttacks(attacker_field_2, target_field_2, army_cardinal_2, -1, beginning_army, end_army);
            }
            else if (margin <= target_field*0.2 && army_cardinal >= margin)
            {
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, margin);
            }
            else if (margin > target_field*0.2 && army_cardinal >= margin)
            {
                margin_2 = Math.floor((target_field*2-attacker_field)/3);
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, margin_2);
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, margin);
            }       
            else
            {
                [attacker_field, target_field, army_cardinal, margin, attacks] = CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, army_cardinal);
            }
        }
    }
    return attacks;
}



/**
 * Add an attack to the list and update the various variable
 * @param  int  attacker_field      Field of the attacker
 * @param  int  target_field        Field of the target
 * @param  int  army_cardinal       Number of units in the army of the attacker
 * @param  int  margin              Amount of field to take (-1 si maximum catch)
 * @param  list attacks             List of all the attacks already computed
 * @param  int  valeur              Amount of field to take on this attack
 * @return list                     Data updated after this attack
 **/

function CreateAttack(attacker_field, target_field, army_cardinal, margin, attacks, valeur) {
    if(valeur == -2) {
        valeur = Math.floor(target_field * 0.2);
    }
    attacker_field += valeur;
    target_field -= valeur;
    army_cardinal -= valeur;
    margin -= valeur;
    attacks = { 
        nombre : valeur,
        completer : (valeur == -2)
    };

    return [attacker_field, target_field, army_cardinal, margin, attacks];
}
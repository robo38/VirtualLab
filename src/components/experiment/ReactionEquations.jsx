import React from 'react';
import { FileText } from 'lucide-react';

export const ReactionEquations = ({
  state,
  calculated,
  titratedVolume,
}) => {
  // Format chemical equation based on selected acid and base
  const getReactionEquation = () => {
    const reactions = {
      'HCl': {
        'NaOH': { reactants: 'NaOH + HCl', products: 'NaCl + H₂O' },
        'KOH': { reactants: 'KOH + HCl', products: 'KCl + H₂O' },
        'Ca(OH)2': { reactants: 'Ca(OH)₂ + 2HCl', products: 'CaCl₂ + 2H₂O' },
        'NH3': { reactants: 'NH₃ + HCl', products: 'NH₄Cl' },
      },
      'H2SO4': {
        'NaOH': { reactants: '2NaOH + H₂SO₄', products: 'Na₂SO₄ + 2H₂O' },
        'KOH': { reactants: '2KOH + H₂SO₄', products: 'K₂SO₄ + 2H₂O' },
        'Ca(OH)2': { reactants: 'Ca(OH)₂ + H₂SO₄', products: 'CaSO₄ + 2H₂O' },
        'NH3': { reactants: '2NH₃ + H₂SO₄', products: '(NH₄)₂SO₄' },
      },
      'HNO3': {
        'NaOH': { reactants: 'NaOH + HNO₃', products: 'NaNO₃ + H₂O' },
        'KOH': { reactants: 'KOH + HNO₃', products: 'KNO₃ + H₂O' },
        'Ca(OH)2': { reactants: 'Ca(OH)₂ + 2HNO₃', products: 'Ca(NO₃)₂ + 2H₂O' },
        'NH3': { reactants: 'NH₃ + HNO₃', products: 'NH₄NO₃' },
      },
      'CH3COOH': {
        'NaOH': { reactants: 'NaOH + CH₃COOH', products: 'CH₃COONa + H₂O' },
        'KOH': { reactants: 'KOH + CH₃COOH', products: 'CH₃COOK + H₂O' },
        'Ca(OH)2': { reactants: 'Ca(OH)₂ + 2CH₃COOH', products: '(CH₃COO)₂Ca + 2H₂O' },
        'NH3': { reactants: 'NH₃ + CH₃COOH', products: 'CH₃COONH₄' },
      },
    };

    return reactions[state.acidType]?.[state.baseType] || { reactants: 'Base + Acid', products: 'Salt + Water' };
  };

  const reaction = getReactionEquation();

  return (
    <div className="lab-card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="lab-gradient rounded-lg p-2">
          <FileText className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="font-display font-semibold text-lg">Reaction & Equations</h2>
      </div>

      {/* Chemical Equation */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
        <p className="text-xs text-muted-foreground mb-2">Chemical Equation</p>
        <div className="text-center font-display text-lg font-semibold text-foreground">
          <span className="text-blue-500">{reaction.reactants.split(' + ')[0]}</span>
          <span className="text-muted-foreground"> + </span>
          <span className="text-red-500">{reaction.reactants.split(' + ')[1]}</span>
          <span className="text-primary mx-3">→</span>
          <span className="text-green-500">{reaction.products}</span>
        </div>
      </div>

      {/* Calculated Values */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          Calculated Values
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Moles of Acid */}
          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
            <p className="text-xs text-muted-foreground mb-1">nₐ (moles of acid)</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              {calculated.nA.toExponential(4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              = Cₐ × Vₐ / 1000
            </p>
          </div>

          {/* Moles of Base */}
          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
            <p className="text-xs text-muted-foreground mb-1">n_b (moles of base)</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              {calculated.nB.toExponential(4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              = C_b × V_b / 1000
            </p>
          </div>

          {/* Volume of Acid */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Vₐ (acid volume)</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              {state.acidVolume.toFixed(1)} <span className="text-sm text-muted-foreground">mL</span>
            </p>
          </div>

          {/* Volume of Base */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">V_b (base volume)</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              {titratedVolume.toFixed(1)} <span className="text-sm text-muted-foreground">mL</span>
            </p>
          </div>
        </div>

        {/* Total Volume */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">V_T = Vₐ + V_b (total volume)</p>
          <p className="font-mono text-xl font-bold text-primary">
            {calculated.vT.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">mL</span>
          </p>
        </div>

        {/* pH Value */}
        <div className="bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10 rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Current pH</p>
          <p className="font-mono text-2xl font-bold" style={{
            color: calculated.pH < 6 
              ? 'hsl(0, 70%, 50%)' 
              : calculated.pH > 8 
                ? 'hsl(220, 70%, 50%)' 
                : 'hsl(120, 50%, 45%)'
          }}>
            {calculated.pH.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {calculated.pH < 7 
              ? `Acidic (excess H⁺)` 
              : calculated.pH > 7 
                ? `Basic (excess OH⁻)` 
                : `Neutral (equivalence point)`}
          </p>
        </div>

        {/* Equivalence Point Info */}
        <div className="bg-muted/30 rounded-lg p-3 border border-dashed border-border">
          <p className="text-xs text-muted-foreground mb-1">Equivalence Point</p>
          <p className="text-sm text-foreground">
            V_b = <span className="font-mono font-semibold">{calculated.equivalencePoint.toFixed(2)} mL</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Time until equilibrium: {(calculated.equivalencePoint - titratedVolume) > 0 
              ? `${((calculated.equivalencePoint - titratedVolume) / 5).toFixed(1)} steps`
              : 'Reached'}
          </p>
        </div>
      </div>
    </div>
  );
};

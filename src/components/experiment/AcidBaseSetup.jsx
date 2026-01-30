import React from 'react';
import { Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlaskVisualization } from './FlaskVisualization';

const acids = [
  { value: 'HCl', label: 'HCl (Hydrochloric Acid)' },
  { value: 'H2SO4', label: 'H₂SO₄ (Sulfuric Acid)' },
  { value: 'HNO3', label: 'HNO₃ (Nitric Acid)' },
  { value: 'CH3COOH', label: 'CH₃COOH (Acetic Acid)' },
];

const bases = [
  { value: 'NaOH', label: 'NaOH (Sodium Hydroxide)' },
  { value: 'KOH', label: 'KOH (Potassium Hydroxide)' },
  { value: 'Ca(OH)2', label: 'Ca(OH)₂ (Calcium Hydroxide)' },
  { value: 'NH3', label: 'NH₃ (Ammonia)' },
];

export const AcidBaseSetup = ({
  state,
  calculated,
  titratedVolume,
  onAcidChange,
  onBaseChange,
  onReset,
}) => {
  return (
    <div className="lab-card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="lab-gradient rounded-lg p-2">
          <Beaker className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="font-display font-semibold text-lg">Acid & Base Setup</h2>
      </div>

      {/* Flask Visualization */}
      <div className="h-96 mb-6 bg-muted/30 rounded-lg border border-border p-4">
        <FlaskVisualization
          acidVolume={state.acidVolume}
          baseVolume={titratedVolume}
          maxVolume={100}
          pH={calculated.pH}
        />
      </div>

      {/* Acid Controls */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          Acid
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select 
              value={state.acidType} 
              onValueChange={(v) => onAcidChange(v, state.acidConcentration, state.acidVolume)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {acids.map((acid) => (
                  <SelectItem key={acid.value} value={acid.value}>
                    {acid.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Cₐ (mol/L)</Label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              max="2"
              value={state.acidConcentration}
              onChange={(e) => onAcidChange(state.acidType, parseFloat(e.target.value) || 0.1, state.acidVolume)}
              className="bg-background"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Vₐ (mL)</Label>
            <Input
              type="number"
              step="1"
              min="1"
              max="100"
              value={state.acidVolume}
              onChange={(e) => onAcidChange(state.acidType, state.acidConcentration, parseFloat(e.target.value) || 25)}
              className="bg-background"
            />
          </div>
        </div>
      </div>

      {/* Base Controls */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          Base
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select 
              value={state.baseType} 
              onValueChange={(v) => onBaseChange(v, state.baseConcentration, state.baseVolume)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {bases.map((base) => (
                  <SelectItem key={base.value} value={base.value}>
                    {base.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">C_b (mol/L)</Label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              max="2"
              value={state.baseConcentration}
              onChange={(e) => onBaseChange(state.baseType, parseFloat(e.target.value) || 0.1, state.baseVolume)}
              className="bg-background"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">V_b (mL)</Label>
            <Input
              type="number"
              step="1"
              min="0"
              max="100"
              value={titratedVolume.toFixed(1)}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onReset} className="w-full">
          Reset Details
        </Button>
      </div>
    </div>
  );
};

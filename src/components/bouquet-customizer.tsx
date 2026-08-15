import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import {
  ARRANGEMENT_STYLES,
  FLOWER_TYPES,
  OCCASIONS,
  type BouquetCustomization,
  type FlowerType,
  colorOptionsFor,
  colorSelectionMode,
  stylesAvailableFor,
} from "@/lib/bouquet-customization";

interface BouquetCustomizerProps {
  value: BouquetCustomization;
  onChange: (value: BouquetCustomization) => void;
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
        {label}
      </Label>
      {children}
    </div>
  );
}

function ChipGroup({
  options,
  selected,
  onSelect,
  disabled,
}: {
  options: readonly string[];
  selected: (option: string) => boolean;
  onSelect: (option: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className={`rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-all ${
            selected(option)
              ? "border-primary bg-primary/5 ring-1 ring-primary text-foreground"
              : "border-border/60 hover:border-primary/40 bg-card text-foreground/80"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function BouquetCustomizer({ value, onChange }: BouquetCustomizerProps) {
  const availableStyles = value.flowerType ? stylesAvailableFor(value.flowerType) : [];
  const colorMode = colorSelectionMode(value.style);
  const colorOptions = colorOptionsFor(value.flowerType);

  const handleFlowerType = (flowerType: string) => {
    const nextFlowerType = flowerType as FlowerType;
    const nextStyles = stylesAvailableFor(nextFlowerType);
    // Mixed/Assorted is always multicolor, so lock style to "Mixed" and clear
    // stale colors from whatever flower type was previously selected.
    onChange({
      ...value,
      flowerType: nextFlowerType,
      style: nextStyles.length === 1 ? nextStyles[0] : null,
      colors: [],
    });
  };

  const handleStyle = (style: string) => {
    onChange({ ...value, style: style as BouquetCustomization["style"], colors: [] });
  };

  const handleColor = (color: string) => {
    if (colorMode === "single") {
      onChange({ ...value, colors: [color] });
    } else {
      const alreadySelected = value.colors.includes(color);
      onChange({
        ...value,
        colors: alreadySelected
          ? value.colors.filter((c) => c !== color)
          : [...value.colors, color],
      });
    }
  };

  const handleOccasion = (occasion: string) => {
    onChange({ ...value, occasion: occasion as BouquetCustomization["occasion"] });
  };

  const handleArrangementStyle = (arrangementStyle: string) => {
    onChange({
      ...value,
      arrangementStyle: arrangementStyle as BouquetCustomization["arrangementStyle"],
    });
  };

  return (
    <div className="space-y-4">
      <FilterRow label="Flower Type">
        <ChipGroup
          options={FLOWER_TYPES}
          selected={(opt) => value.flowerType === opt}
          onSelect={handleFlowerType}
        />
      </FilterRow>

      {value.flowerType && (
        <FilterRow label="Style">
          {availableStyles.length === 1 ? (
            <p className="text-[11px] text-muted-foreground">
              {value.flowerType} is always a multicolor blend, so this is set to{" "}
              <span className="font-semibold text-foreground">Mixed</span>.
            </p>
          ) : (
            <ChipGroup
              options={availableStyles}
              selected={(opt) => value.style === opt}
              onSelect={handleStyle}
            />
          )}
        </FilterRow>
      )}

      {value.flowerType && value.style && (
        <FilterRow label={`Color${colorMode === "multi" ? " (multi)" : ""}`}>
          <ChipGroup
            options={colorOptions}
            selected={(opt) => value.colors.includes(opt)}
            onSelect={handleColor}
          />
        </FilterRow>
      )}

      <FilterRow label="Occasion">
        <ChipGroup
          options={OCCASIONS}
          selected={(opt) => value.occasion === opt}
          onSelect={handleOccasion}
        />
      </FilterRow>

      <FilterRow label="Arrangement">
        <ChipGroup
          options={ARRANGEMENT_STYLES}
          selected={(opt) => value.arrangementStyle === opt}
          onSelect={handleArrangementStyle}
        />
      </FilterRow>
    </div>
  );
}

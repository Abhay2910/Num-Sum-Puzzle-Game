import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Cell from './Cell';
import { CellModel, Coord } from './types';
import { generateGrid, areAdjacent } from './utils';

type GridProps = {
  size: number; // N
  cellPx?: number;
  initialGrid?: CellModel[]; // optional seeded grid (helpful for tests)
  target: number;
  onMatchSuccess?: (cells: CellModel[]) => void;
};

export default function Grid({ size, cellPx = 64, initialGrid, target, onMatchSuccess }: GridProps) {
  // grid as flat array of CellModel
  const [grid, setGrid] = useState<CellModel[]>(
    () => initialGrid ?? generateGrid(size)
  );

  // selection: array of cell ids (order matters)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [invalidSignal, setInvalidSignal] = useState(0); // bump to trigger wiggle

  const findById = useCallback((id: string) => grid.find((g) => g.id === id), [grid]);

  // helpers to map flat -> 2D
  const rows = useMemo(() => {
    const r: CellModel[][] = [];
    for (let i = 0; i < size; i++) {
      r.push(grid.slice(i * size, i * size + size));
    }
    return r;
  }, [grid, size]);

  const lastSelected = useMemo(() => {
    if (selectedIds.length === 0) return null;
    return findById(selectedIds[selectedIds.length - 1]) ?? null;
  }, [selectedIds, grid]);

  const handlePressCell = useCallback((model: CellModel) => {
    if (model.removed) return;

    // If nothing selected, start new path
    if (selectedIds.length === 0) {
      setSelectedIds([model.id]);
      return;
    }

    // If this is already selected, ignore (press should be handled by deselect)
    if (selectedIds.includes(model.id)) {
      return;
    }

    // Enforce adjacency to last selected
    if (!lastSelected) {
      setSelectedIds([model.id]);
      return;
    }
    const ok = areAdjacent({ r: model.r, c: model.c }, { r: lastSelected.r, c: lastSelected.c });
    if (!ok) {
      // trigger wiggle invalid
      setInvalidSignal((s) => s + 1);
      return;
    }

    setSelectedIds((prev) => [...prev, model.id]);
  }, [selectedIds, lastSelected, grid]);

  const handleDeselectCell = useCallback((model: CellModel) => {
    // only allow pop-like deselect of last selected
    if (selectedIds.length === 0) return;
    const lastId = selectedIds[selectedIds.length - 1];
    if (lastId === model.id) {
      setSelectedIds((prev) => prev.slice(0, prev.length - 1));
    } else {
      // optionally wiggle to indicate invalid deselect
      setInvalidSignal((s) => s + 1);
    }
  }, [selectedIds]);

  const computeSelectedSum = useMemo(() => {
    return selectedIds.reduce((acc, id) => {
      const item = grid.find((g) => g.id === id);
      return acc + (item ? item.value : 0);
    }, 0);
  }, [selectedIds, grid]);

  const submitSelection = useCallback(() => {
    const sum = selectedIds.reduce((acc, id) => {
      const it = grid.find((g) => g.id === id);
      return acc + (it ? it.value : 0);
    }, 0);

    if (sum === target && selectedIds.length > 0) {
      // success: mark removed (optimistic UI), trigger animations by toggling removed flag
      const matched = grid.filter((g) => selectedIds.includes(g.id));
      setGrid((prev) => prev.map((g) => selectedIds.includes(g.id) ? { ...g, removed: true } : g));
      setSelectedIds([]);
      onMatchSuccess && onMatchSuccess(matched);
    } else {
      // invalid
      setInvalidSignal((s) => s + 1);
      // clear after short delay for UX
      setTimeout(() => setSelectedIds([]), 420);
    }
  }, [selectedIds, target, grid]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // track removing state for animations: any selected id that will be removed
  const removingSet = new Set<string>();
  // For a simple demo, use removed flag directly as "removing" prop to cell so it plays vanish.
  // After animation we could prune cells or collapse grid.

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ marginBottom: 8, fontWeight: '700' }}>Select contiguous cells to sum to {target}</Text>
      <View style={styles.grid}>
        {rows.map((row, rIdx) => (
          <View key={`row-${rIdx}`} style={styles.row}>
            {row.map((cell) => (
              <Cell
                key={cell.id}
                model={cell}
                size={cellPx}
                selected={selectedIds.includes(cell.id)}
                removing={cell.removed === true}
                invalidSignal={invalidSignal}
                onPress={handlePressCell}
                onDeselect={handleDeselectCell}
                onAnimationEnd={() => {
                  // animation finished; Potentially remove cell from grid for permanent state or do collapse here.
                  // For demo, we'll keep removed flag which dims cell (or hide it). Could compact grid later.
                }}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Controls: For demonstration, using inline controls */}
      <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '700' }}>Current: {computeSelectedSum}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text onPress={clearSelection} style={{ marginRight: 12, color: '#888' }}>Clear</Text>
          <Text onPress={submitSelection} style={{ color: '#0a84ff', fontWeight: '700' }}>Submit</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});

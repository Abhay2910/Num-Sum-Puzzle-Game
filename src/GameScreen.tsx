import React, { useCallback, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Grid from './Grid';
import TargetDisplay from './TargetDisplay';
import { generateGrid } from './utils';

// Simple helper to compute a target from the grid (pick some random subset)
function computeTargetFromGrid(gridFlat: any[]) {
  // pick 2-4 contiguous-ish cells (for demo just sum some random indexes)
  const sample = gridFlat.slice(0, 4).map((g) => g.value);
  return sample.reduce((a, b) => a + b, 0);
}

export default function GameScreen() {
  const N = 6; // demo size; configurable
  const [seedGrid] = useState(() => generateGrid(N));
  const [target, setTarget] = useState<number>(() => computeTargetFromGrid(seedGrid));
  const [currentSum, setCurrentSum] = useState(0);

  const handleMatchSuccess = useCallback((cells) => {
    // award points, compute next target, etc.
    setTarget((t) => {
      // new random target for demo
      const newTarget = Math.floor(Math.random() * 20) + 5;
      return newTarget;
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TargetDisplay
        target={target}
        currentSum={currentSum}
        onClear={() => {
          // handled inside Grid via internal clear; we could pass handlers through
        }}
        onSubmit={() => {
          // optional - can call a callback in Grid by ref or upwards prop; omitted for brevity
        }}
      />
      <View style={{ flex: 1 }}>
        <Grid
          size={N}
          cellPx={62}
          initialGrid={seedGrid}
          target={target}
          onMatchSuccess={handleMatchSuccess}
        />
      </View>
    </SafeAreaView>
  );
}

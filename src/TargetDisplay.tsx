import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  target: number;
  currentSum: number;
  onSubmit: () => void;
  onClear: () => void;
};

export default function TargetDisplay({ target, currentSum, onSubmit, onClear }: Props) {
  const progressText = `${currentSum} / ${target}`;
  return (
    <View style={s.container}>
      <View>
        <Text style={s.label}>Target</Text>
        <Text style={s.target}>{target}</Text>
      </View>

      <View style={s.controls}>
        <Text style={s.progress}>{progressText}</Text>
        <Pressable onPress={onSubmit} style={s.button}>
          <Text style={s.btnText}>Submit</Text>
        </Pressable>
        <Pressable onPress={onClear} style={[s.button, { backgroundColor: '#eee' }]}>
          <Text style={[s.btnText, { color: '#333' }]}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 12, color: '#666' },
  target: { fontSize: 28, fontWeight: '800' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progress: { marginRight: 12, fontWeight: '700' },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#0a84ff',
    marginLeft: 6,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});

export default function getLastReading(data:any) {
  const lines = data.trim().split('\n');

  // Handle potential empty data
  if (lines.length < 2) {
    return null; // Or throw an error if you prefer
  }

  const lastLine = lines.pop(); // Get the last line
  const lastReading = lastLine.split(',')[1]; // Split by comma, take the second element 

  return lastReading;
}

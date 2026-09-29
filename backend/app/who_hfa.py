"""WHO Child Growth Standards: length/height-for-age z-score cut-offs.

Source: WHO Child Growth Standards tables (birth to 2 years length-for-age,
and 2 to 5 years height-for-age). This module stores the -3 SD, -2 SD, and
median values needed for a transparent screening fallback.

Important: this is not the thesis ML model and is not a medical diagnosis.
"""

GIRLS_ROWS = """
0 43.6 45.4 49.1
1 47.8 49.8 53.7
2 51.0 53.0 57.1
3 53.5 55.6 59.8
4 55.6 57.8 62.1
5 57.4 59.6 64.0
6 58.9 61.2 65.7
7 60.3 62.7 67.3
8 61.7 64.0 68.7
9 62.9 65.3 70.1
10 64.1 66.5 71.5
11 65.2 67.7 72.8
12 66.3 68.9 74.0
13 67.3 70.0 75.2
14 68.3 71.0 76.4
15 69.3 72.0 77.5
16 70.2 73.0 78.6
17 71.1 74.0 79.7
18 72.0 74.9 80.7
19 72.8 75.8 81.7
20 73.7 76.7 82.7
21 74.5 77.5 83.7
22 75.2 78.4 84.6
23 76.0 79.2 85.5
24 76.0 79.3 85.7
25 76.8 80.0 86.6
26 77.5 80.8 87.4
27 78.1 81.5 88.3
28 78.8 82.2 89.1
29 79.5 82.9 89.9
30 80.1 83.6 90.7
31 80.7 84.3 91.4
32 81.3 84.9 92.2
33 81.9 85.6 92.9
34 82.5 86.2 93.6
35 83.1 86.8 94.4
36 83.6 87.4 95.1
37 84.2 88.0 95.7
38 84.7 88.6 96.4
39 85.3 89.2 97.1
40 85.8 89.8 97.7
41 86.3 90.4 98.4
42 86.8 90.9 99.0
43 87.4 91.5 99.7
44 87.9 92.0 100.3
45 88.4 92.5 100.9
46 88.9 93.1 101.5
47 89.3 93.6 102.1
48 89.8 94.1 102.7
49 90.3 94.6 103.3
50 90.7 95.1 103.9
51 91.2 95.6 104.5
52 91.7 96.1 105.0
53 92.1 96.6 105.6
54 92.6 97.1 106.2
55 93.0 97.6 106.7
56 93.4 98.1 107.3
57 93.9 98.5 107.8
58 94.3 99.0 108.4
59 94.7 99.5 108.9
60 95.2 99.9 109.4
"""

BOYS_ROWS = """
0 44.2 46.1 49.9
1 48.9 50.8 54.7
2 52.4 54.4 58.4
3 55.3 57.3 61.4
4 57.6 59.7 63.9
5 59.6 61.7 65.9
6 61.2 63.3 67.6
7 62.7 64.8 69.2
8 64.0 66.2 70.6
9 65.2 67.5 72.0
10 66.4 68.7 73.3
11 67.6 69.9 74.5
12 68.6 71.0 75.7
13 69.6 72.1 76.9
14 70.6 73.1 78.0
15 71.6 74.1 79.1
16 72.5 75.0 80.2
17 73.3 76.0 81.2
18 74.2 76.9 82.3
19 75.0 77.7 83.2
20 75.8 78.6 84.2
21 76.5 79.4 85.1
22 77.2 80.2 86.0
23 78.0 81.0 86.9
24 78.0 81.0 87.1
25 78.6 81.7 88.0
26 79.3 82.5 88.8
27 79.9 83.1 89.6
28 80.5 83.8 90.4
29 81.1 84.5 91.2
30 81.7 85.1 91.9
31 82.3 85.7 92.7
32 82.8 86.4 93.4
33 83.4 86.9 94.1
34 83.9 87.5 94.8
35 84.4 88.1 95.4
36 85.0 88.7 96.1
37 85.5 89.2 96.7
38 86.0 89.8 97.4
39 86.5 90.3 98.0
40 87.0 90.9 98.6
41 87.5 91.4 99.2
42 88.0 91.9 99.9
43 88.4 92.4 100.4
44 88.9 93.0 101.0
45 89.4 93.5 101.6
46 89.8 94.0 102.2
47 90.3 94.4 102.8
48 90.7 94.9 103.3
49 91.2 95.4 103.9
50 91.6 95.9 104.4
51 92.1 96.4 105.0
52 92.5 96.9 105.6
53 93.0 97.4 106.1
54 93.4 97.8 106.7
55 93.9 98.3 107.2
56 94.3 98.8 107.8
57 94.7 99.3 108.3
58 95.2 99.7 108.9
59 95.6 100.2 109.4
60 96.1 100.7 110.0
"""


def _parse(rows: str):
    result = {}
    for line in rows.strip().splitlines():
        month, minus3, minus2, median = line.split()
        result[int(month)] = {
            "minus_3_sd_cm": float(minus3),
            "minus_2_sd_cm": float(minus2),
            "median_cm": float(median),
        }
    return result


WHO_HFA = {"female": _parse(GIRLS_ROWS), "male": _parse(BOYS_ROWS)}


def classify_who_hfa(age_month: int, gender: str, height_cm: float):
    """Return a transparent WHO height-for-age screening category."""
    gender = gender.lower().strip()
    if gender not in WHO_HFA:
        raise ValueError("gender must be 'female' or 'male'")
    if age_month < 0 or age_month > 60:
        raise ValueError("age_month must be between 0 and 60")

    ref = WHO_HFA[gender][age_month]
    if height_cm < ref["minus_3_sd_cm"]:
        risk = "high"
        status = "severely_stunted_range"
    elif height_cm < ref["minus_2_sd_cm"]:
        risk = "medium"
        status = "stunted_range"
    else:
        risk = "low"
        status = "not_stunted_by_hfa_cutoff"

    return {
        "risk_level": risk,
        "growth_status": status,
        "reference": ref,
        "measurement_basis": "length-for-age" if age_month < 24 else "height-for-age",
        "source": "WHO Child Growth Standards",
    }

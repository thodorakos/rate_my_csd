import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShowerGate() {
  const [step, setStep] = useState(1);
  const [days, setDays] = useState('');
  const [error, setError] = useState('');
  const [karafliaError, setKarafliaError] = useState('');
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2000); 
  };

  const handleVerify = () => {
    const d = parseInt(days); // "Logic: The user inputs a number (days)"
    if (isNaN(d)) {
      setError("Please enter a number");
      return;
    }

    if (d < 3) {
      setError("You shall not pass! (hint: >= 3)");
      return;
    }

    setError('');
    setStep(4);
  };

  const handleKarafliaVerify = (answerRaw: string) => {
    const answer = answerRaw.trim().toLowerCase();
    if (answer === 'no' || answer === 'oxi' || answer === 'όχι') {
      setKarafliaError("You can't enter.");
      return;
    }

    if (answer === 'yes' || answer === 'nai' || answer === 'ναι') {
      window.location.href = '/dashboard';
      return;
    }

    setKarafliaError("Please answer with oxi/nai");
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,hsl(var(--primary)/0.12)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,hsl(var(--accent)/0.12)_0%,transparent_50%),radial-gradient(circle_at_50%_90%,hsl(var(--primary)/0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,hsl(var(--primary)/0.25)_0%,transparent_25%)]" />
      <div 
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: mousePosition 
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--accent) / 0.15), transparent 40%)`
            : "transparent",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
        <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-background/95 backdrop-blur p-8 rounded-xl border-2">
            <Badge variant="secondary" className="w-fit">CSD • student-led</Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Rate My CSD
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Ena minimal, student-first meros gia reviews gia to csd me clarity, honesty kai nootropia.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Anonymous ratings</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
              <span>Ftiagmeno gia alania</span>
            </div>
          </div>

          <Card className="bg-background/95 backdrop-blur animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Access Check</CardTitle>
                <Badge variant="outline">Step {step} of 4</Badge>
              </div>
              <CardDescription>
                Grigori epivevaiosi prin mpeis sto dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                  <h2 className="text-2xl font-semibold tracking-tight">Etoimos gia rate?</h2>
                  <p className="text-muted-foreground">
                    Kane epivevewsh kai mpes na kaneis reviews.
                  </p>
                  <Button size="lg" onClick={handleEnter} className="w-full">
                    Epivevewsh
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 animate-in fade-in duration-500">
                  <h2 className="text-2xl font-semibold tracking-tight">Verification</h2>
                  <p className="text-muted-foreground">
                    First, epivevewse oti eisai Csdas.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-semibold tracking-tight">Apo pote exeis na kaneis mpanio?</h2>
                  <div className="grid gap-4">
                    <Input
                      type="number"
                      placeholder="Days"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="h-12"
                    />
                    <Button size="lg" onClick={handleVerify}>
                      Submit
                    </Button>
                  </div>
                  {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-semibold tracking-tight">Karafliazeis?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="lg" onClick={() => handleKarafliaVerify('yes')}>
                      Yes
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => handleKarafliaVerify('no')}>
                      No
                    </Button>
                  </div>
                  {karafliaError && <p className="text-sm font-medium text-destructive">{karafliaError}</p>}
                </div>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Oi apantiseis sou den apothikevontai.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
